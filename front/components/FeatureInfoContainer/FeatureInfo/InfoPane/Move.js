import React from 'react'

import {main, field} from './style'

export default ({feature}) => {
  return (
    <span className={main}>
      <span className={field}>
        <label>Activity</label>
        <value>{feature.activityName}</value>
      </span>
      <span className={field}>
        <label>Duration</label>
        <value>{feature.duration}</value>
      </span>
      <span className={field}>
        <label>{'Start -> End'}</label>
        <value>{feature.startEndDescriptor}</value>
      </span>
      <span className={field}>
        <label>{'Distance'}</label>
        <value>{feature.displayDistance}</value>
      </span>
    </span>
  )
}
