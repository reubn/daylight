import React from 'react'

import {logo, fillGradient, strokeGradient} from './style'

const Logo = props => (
  <svg viewBox="-5 -5 245 310" {...props}>
    <path className={logo} fill={`url(#${fillGradient})`} stroke={`url(#${strokeGradient})`} strokeWidth="10" strokeLinejoin="round" d="M191.381913,294.224285 C111.749377,317.058548 28.6836252,271.014449 5.84936293,191.381913 C-16.9848993,111.749377 29.059199,28.6836252 108.691735,5.84936293 C125.545036,1.0167567 142.552113,-0.730732444 159.10946,0.272366345 C108.784673,36.1248933 83.9774636,101.037917 101.979119,163.817149 C119.980774,226.596382 175.417142,268.49993 237.093935,272.236518 C223.584062,281.861256 208.235214,289.391679 191.381913,294.224285 L191.381913,294.224285 Z"></path>

    <linearGradient x1="-4%" y1="-6%" x2="50%" y2="100%" id={fillGradient}>
      <stop stopColor="transparent" offset="0%"></stop>
      <stop stopColor="transparent" offset="100%"></stop>
    </linearGradient>
    <linearGradient x1="-4%" y1="-6%" x2="50%" y2="100%" id={strokeGradient}>
      <stop stopColor="#5DEDCB" offset="0%"></stop>
      <stop stopColor="#60CBFC" offset="100%"></stop>
    </linearGradient>
  </svg>
)

export default Logo
