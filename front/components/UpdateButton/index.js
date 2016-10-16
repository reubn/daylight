import React from 'react'

import {updateButton} from './style'

const UpdateButton = ({updateRange, range}) => <span className={updateButton} onClick={() => updateRange(range)}>Update</span>

export default UpdateButton
