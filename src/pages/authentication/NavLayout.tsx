import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../utils/GetPageTitle';

const NavLayout = () => {

  const location = useLocation()
  
  return (
    <div className='flex justify-between items-center'>
      <h1 className='font-quick text-[1rem] font-medium leading-[3rem]'>{getPageTitle(location.pathname)}</h1>
      <div className='w-8 h-8 border rounded-full flex items-center border-gray-400 justify-center cursor-pointer'>
        <IoMdNotificationsOutline size={'1.3rem'}/>
      </div>
    </div>
  )
}

export default NavLayout