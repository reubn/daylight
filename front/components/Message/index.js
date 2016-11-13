import React from 'react'
import {error as errorStyle, message, indicator, reason} from './style'

const Message = ({error}) => (
  <label className={`${message} ${error && !error.valid ? errorStyle : ''}`}>
    <span className={indicator}>!!</span>
    <span className={reason}>{error ? error.reason : ''}</span>
  </label>
)

export default Message
