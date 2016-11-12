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
    const field = event.target.type === 'password' ? 'password' : 'username'
    this.setState({[field]: event.target.value}, () => this.props.onChange(this.state))
  }
  onSubmit(){
    this.props.onSubmit(this.state)
  }
  render(){
    return (
      <section className={login}>
        <input type="username" value={this.state.username} data-valid={this.props.errors.username ? this.props.errors.username.valid : true} placeholder="track@your.life" onChange={this.onChange} />
        <input type="password" value={this.state.password} data-valid={this.props.errors.password ? this.props.errors.password.valid : true} placeholder="••••••••••••" onChange={this.onChange} />
        <input type="submit" value={this.props.loading ? '...' : 'Login'} onClick={this.onSubmit} disabled={!this.props.valid} />
      </section>
    )
  }
}
