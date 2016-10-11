const axios = require('axios')
const {searchURL, clientID, clientSecret} = require('../../config/foursquare')

module.exports = ({name: searchName, geo: {lat, lng}={}}) => {
  if(searchName){
    return axios.get(searchURL, {
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        intent: 'match',
        v: 20160818,
        ll: `${lat},${lng}`,
        query: searchName
      }
    })
   .then(({data: {response: {venues: [match]}}}) => {
     if(match){
       const {name, id, categories: [{id: cat}]} = match
       return {name, id, cat}
     }
     return Promise.reject(new Error('NoMatch'))
   })
  }
  return Promise.reject(new Error('NoMatch'))
}
