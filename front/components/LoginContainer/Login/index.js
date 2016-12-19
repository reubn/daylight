import React from 'react'
import {login, banner} from './style'

import Message from '../../Message'

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
        {this.props.redirect ? <h1 className={banner}>{`You must login to view ${this.props.redirect}`}</h1> : null}
        <input type="username" value={this.state.username} data-valid={this.props.errors.username ? this.props.errors.username.valid : true} placeholder="track@your.life" onChange={this.onChange} />
        <Message error={this.props.errors.username} />
        <input type="password" value={this.state.password} data-valid={this.props.errors.password ? this.props.errors.password.valid : true} placeholder="••••••••••••" onChange={this.onChange} />
        <Message error={this.props.errors.password} />
        <input type="submit" value={this.props.loading ? '...' : 'Login'} onClick={this.onSubmit} disabled={!this.props.valid} />
      </section>
    )
  }
}
