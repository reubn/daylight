import React from 'react'
import classnames from 'classnames'

import {loader, one, two, three} from './style'

const Loader = props => (
  <section {...props}>
    <span className={classnames(loader, one)} />
    <span className={classnames(loader, two)} />
    <span className={classnames(loader, three)} />
  </section>
)

export default Loader
