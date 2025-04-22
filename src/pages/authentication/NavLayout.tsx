import { IoMdNotificationsOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../utils/GetPageTitle';
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import MobileSideLayout from "../../components/home/MobileSideLayout";

const NavLayout = () => {

  const location = useLocation()

  const [mobile, setMobile] = useState(false)

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMobile(false)
    }
  }
  
  return (
    <div className='flex justify-between items-center'>
      <div className="flex items-center gap-4">
        <div className='lg:hidden cursor-pointer xl:hidden' onClick={() => setMobile(!mobile)}>
          <FaBarsStaggered size={'1.5rem'} />
        </div>
        {mobile && <MobileSideLayout handleClickOut={handleClickOutside} setMobile={setMobile} />}
        <h1 className='font-inter text-[1rem] font-medium leading-[3rem]'>{getPageTitle(location.pathname)}</h1>
      </div>
      <div className='w-8 h-8 border rounded-full flex items-center border-gray-400 justify-center cursor-pointer'>
        <IoMdNotificationsOutline size={'1.3rem'}/>
      </div>
    </div>
  )
}

export default NavLayout