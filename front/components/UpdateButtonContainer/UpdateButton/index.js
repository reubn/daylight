import React from 'react'

import {updateButton} from './style'

const UpdateButton = ({updateRange, range, updating}) => <span className={updateButton} onClick={() => (updating ? 0 : updateRange(range))}>{updating ? '...' : 'Update'}</span>

export default UpdateButton
