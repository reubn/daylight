import React from 'react'
import {login, errors} from './style'

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {username: '', password: ''}

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event){
    const field = event.target.type === 'password' ? 'password' : 'username'
    if(this.props.errors && this.state[field] !== event.target.value) this.props.resetErrors()
    this.setState({[field]: event.target.value})
  }
  onSubmit(){
    this.props.onSubmit(this.state)
  }
  render(){
    return (
      <section className={`${login} ${this.props.errors ? errors : ''}`}>
        <input type="username" value={this.state.username} placeholder="track@your.life" onChange={this.onChange} />
        <input type="password" value={this.state.password} placeholder="••••••••••••" onChange={this.onChange} />
        <input type="submit" value={this.props.loading ? '...' : 'Login'} onClick={this.onSubmit} />
      </section>
    )
  }
}
