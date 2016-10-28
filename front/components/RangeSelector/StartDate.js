/* eslint-disable react/prefer-stateless-function */

import React from 'react'

import {start} from './style'

export default class StartDate extends React.Component {
  render(){
    return <span className={start} onClick={this.props.onClick}>{this.props.value}</span>
  }
}
