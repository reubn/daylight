import React from 'react'
import {login} from './style'

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {username: '', password: ''}

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event){
    this.setState({[event.target.type === 'password' ? 'password' : 'username']: event.target.value})
  }
  onSubmit(){
    this.props.onSubmit(this.state)
  }
  render(){
    return (
      <section className={login}>
        <input type="username" value={this.state.username} placeholder="track@your.life" onChange={this.onChange} />
        <input type="password" value={this.state.password} placeholder="••••••••••••" onChange={this.onChange} />
        <input type="submit" value="Login" onClick={this.onSubmit} />
      </section>
    )
  }
}
