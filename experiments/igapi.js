const axios = require('axios')
const moment = require('moment')

// const idToEpoch = n => Math.round((n / 1000000000000 + 11024476.5839159095) / 0.008388608)
const epochToId = n => Math.round(((n * 0.008388608) - 11024476.5839159095) * 1000000000000)

const getUserIdAndCSRFToken = ({username}) =>
    axios.get(`https://www.instagram.com/${username}/?__a=1`)
    .then(({data: {user: {id}}, headers: {'set-cookie': cookies}}) => ({
      userId: id,
      CSRFToken: (/csrftoken=(.+?);/g).exec(cookies.find(c => c.startsWith('csrftoken')))[1]
    }))

const fetchPhotos = ({username, userId, CSRFToken, end, start, count}, previousPhotos=[]) => {
  const endId = epochToId(end.unix())
  const request = {
    headers: {
      cookie: `csrftoken=${CSRFToken}`,
      referer: `https://www.instagram.com/${username}/`,
      'x-csrftoken': CSRFToken
    },
    params: {
      q: `ig_user(${userId}) { media.after(${endId}, ${count}) {nodes {    caption,    date,    created_time,    dimensions {      height,      width    },    display_src,    id,    is_video,    location {      lat,      lng,      id    },    thumbnail_src}} }`,
      ref: 'users::show'
    }
  }

  return axios.post('https://www.instagram.com/query/', {}, request)
  .then(({data: {media: {nodes}}}) => {
    const {photos: includedPhotos, checkNext: checkNextFlag} = nodes.reduce(({photos}, photo, index) => {
      photo.date = moment.unix(photo.date)
      const include = !!photo.date.isAfter(start)
      const photoAlreadyIncluded = photos.some(({id}) => id === photo.id)
      // console.log(include, photo.date.format('YYYYMMDD'), index, nodes.length-1)
      return {photos: !photoAlreadyIncluded && include ? [...photos, photo] : photos, checkNext: index === nodes.length-1 && include}
    }, {photos: previousPhotos, checkNext: false})

    if(checkNextFlag) return fetchPhotos({username, userId, CSRFToken, end: includedPhotos[includedPhotos.length-1].date, start, count}, includedPhotos)
    return includedPhotos
  })
}

const getPhotos = ({username}, {start: rawStart, end: rawEnd=rawStart}) => {
  const start = moment(rawStart).startOf('d')
  const end = moment(rawEnd).endOf('d')

  const averagePhotosPerDay = 0.02
  const count = Math.max(2, Math.ceil(averagePhotosPerDay * (end.diff(start, 'd') + 1)))

  return (
    // Check if we have valid token in DB
    getUserIdAndCSRFToken({username})
    .then(({userId, CSRFToken}) => (
      fetchPhotos({username, userId, CSRFToken, end, start, count})
    ))
  )
}


getPhotos({username: 'reubn'}, {start: moment([2015, 6, 20]), end: moment([2016, 7, 20])})
.then(data => console.log(JSON.stringify(data, null, 4)))
.catch(console.error)
