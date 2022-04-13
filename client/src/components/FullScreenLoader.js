import { Spin } from 'antd'
import React from 'react'

function FullScreenLoader() {
  return (
    <div className='full-screenLoader'>
        <Spin size="large" />
    </div>
  )
}

export default FullScreenLoader