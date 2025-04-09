import React from 'react'
import { FaTimes } from "react-icons/fa";

const MobileSideLayout = () => {
  return (
    <div className='fixed top-0 left-0 w-[90vh] h-screen bg-white z-50 border-r shadow-md p-4'>
      <div className='flex'>
        <h1>s</h1>
        <FaTimes size={'3rem'} />
      </div>
    </div>
  )
}

export default MobileSideLayout