import React from 'react'
import {Space} from "antd"

const  Header: React.FC = () => {

  return (
    <Space style={{color: 'white'}}>
        <strong>header</strong>
        <span>
            user: cattle
        </span>
    </Space>
  )
}

export default Header