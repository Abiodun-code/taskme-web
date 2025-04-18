import { Link } from 'react-router-dom'
import logo from "../../assets/task-blue.png";
import { truncateText } from '../../utils/TruncateText';
import { LuLogOut } from 'react-icons/lu';

const SideLayout = () => {

  return (
    <div className='w-full h-full'>
      <div className='fixed top-0 left-0 z-30 border-r border-r-neutral-300 bg-neutral-100 shadow-md w-[20vw] h-screen hidden lg:block xl:block'>

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