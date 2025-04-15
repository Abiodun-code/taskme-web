import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/task-blue.png";
import { truncateText } from '../../utils/TruncateText';
import { LuLogOut } from 'react-icons/lu';
import { FaBarsStaggered } from "react-icons/fa6";
import MobileSideLayout from '../../components/ui/MobileSideLayout';

const SideLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full h-full'>
      <Link to={''} className='p-3 lg:hidden xl:hidden flex items-center bg-red-500 w-12 h-12 rounded-full' onClick={() => setIsOpen(!isOpen)}>
        <FaBarsStaggered className='text-white' size={'2rem'} />
      </Link>
      {isOpen &&
        <MobileSideLayout/>
      }

      <div className='border-r shadow-md lg:w-[20vw] xl:w-[20vw] h-screen hidden lg:block xl:block'>
        <figure className="w-full">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-full h-[3rem] max-w-[10rem]  object-cover"
            />
          </Link>
        </figure>
        <div className=' absolute bottom-5 w-full flex items-center px-[1rem]'>
          <div className='flex items-center space-x-2'>
            <div className='border p-4 rounded-full'></div>
            <div className='flex-row items-center'>
              <h1 className='font-inter text-xs font-semibold'>User name</h1>
              <p className='font-league font-light text-sm'>{truncateText('username@gmail.com', 15)}</p>
            </div>
          </div>
          <Link to={''} className='flex items-center justify-center bg-red-500 w-8 h-8 rounded-full ml-9 mr-auto'>
            <LuLogOut className='text-white' size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideLayout