import React from 'react'

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
      <section>
        <input type="username" value={this.state.username} onChange={this.onChange} />
        <input type="password" value={this.state.password} onChange={this.onChange} />
        <input type="submit" value="Login" onClick={this.onSubmit} />
      </section>
    )
  }
}
