/* eslint-disable react/prefer-stateless-function */

import React from 'react'

import {end} from './style'

export default class EndDate extends React.Component {
  render(){
    return <span className={end} onClick={this.props.onClick}>{this.props.value}</span>
  }
}
