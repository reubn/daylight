import moment from 'moment'

class User {
  constructor({name='????', homeLocation={lat: 0, lng: 0}, username, email, accountStartDay, birthday, owner=false, id}={}){
    this.id = id
    this.name = name
    this.homeLocation = homeLocation
    this.username = username
    this.email = email
    this.accountStartDay = moment(accountStartDay)
    this.birthday = moment(birthday)
    this.owner = owner
  }
  get loggedIn(){
    return !!this.id
  }
}

export default User
