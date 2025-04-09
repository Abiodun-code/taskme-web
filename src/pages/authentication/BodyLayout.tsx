import React from 'react'
import { Outlet } from 'react-router-dom'
import SideLayout from './SideLayout'

const BodyLayout = () => {
  return (
    <div className='flex flex-col lg:flex-row w-full bg-white'>
      <div>
        <SideLayout/>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default BodyLayout