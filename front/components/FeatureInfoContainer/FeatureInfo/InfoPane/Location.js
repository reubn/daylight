import React from 'react'

import {main, field, group, inlineEdit} from './style'

export default ({feature, locationCategories}) => (
  <span className={main}>
    <span className={field}>
      <label>Category</label>
      <value>{feature.locationCategory(locationCategories).name}</value>
    </span>
    <span className={field}>
      <label>Latitude and Longitude</label>
      <value>{feature.formattedLatLng}</value>
    </span>
    {feature.visits.sort(({startTime: a}, {startTime: b}) => a.diff(b)).map(visit => (
      <span className={group} key={visit.id}>
        <label>Visit</label>
        <span className={field}>
          <label>{'Start -> End'}</label>
          <value>{visit.startEndDescriptor}</value>
        </span>
        <span className={field}>
          <label>Duration</label>
          <value>{visit.duration}</value>
        </span>
        <span className={inlineEdit}>EDIT</span>
      </span>
      ))}
  </span>
)
