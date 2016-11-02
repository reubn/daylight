const axios = require('axios')
const moment = require('moment')

const idToEpoch = n => Math.round((n / 1000000000000 + 11024476.5839159095) / 0.008388608)
const epochToId = n => Math.round((n * 0.008388608 - 11024476.5839159095) * 1000000000000)

const getUserIdAndCSRFToken = username =>
    axios.get(`https://www.instagram.com/${username}/?__a=1`)
    .then(({data: {user: {id}}, headers: {'set-cookie': cookies}}) => ({
            username,
            userId: id,
            CSRFToken: (/csrftoken=(.+?);/g).exec(cookies.find(c => c.startsWith('csrftoken')))[1]
        }))


const getPhotos = ({username, userId, CSRFToken}, {start, end=start}) => {
  const endEpoch = moment(start).endOf('d').unix()
  const endId = epochToId(endEpoch)
  const request = {
        headers: {
            cookie: `csrftoken=${CSRFToken}`,
            referer: `https://www.instagram.com/${username}/`,
            'x-csrftoken': CSRFToken
        },
        params: {
          q: `ig_user(${userId}) { media.after(${endId}, 1) {nodes {    caption,    date,    created_time,    dimensions {      height,      width    },    display_src,    id,    is_video,    location {      lat,      lng,      id    },    thumbnail_src}} }`,
          ref: 'users::show'
        }
    }

    return axios.post('https://www.instagram.com/query/', {}, request)
}

getUserIdAndCSRFToken('reubn')
.then(a => getPhotos(a, {start: moment([2016, 7, 20])}))
.then(({data}) => console.log(JSON.stringify(data)))
.catch(console.error)
