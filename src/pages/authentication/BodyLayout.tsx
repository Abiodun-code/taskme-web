import { Outlet } from 'react-router-dom'
import SideLayout from './SideLayout'
import NavLayout from './NavLayout'

const BodyLayout = () => {
  return (
    <div className='flex flex-col lg:flex-row w-full bg-white'>
      <div>
        <SideLayout/>
      </div>
      <div className='w-[83vw]'>
        <div className='py-1 px-5 border-b w-full shadow-sm'>
          <NavLayout/>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default BodyLayout