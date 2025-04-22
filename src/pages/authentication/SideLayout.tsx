import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/task-blue.png";
import { truncateText } from '../../utils/TruncateText';
import { LuLogOut } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/store/not-authenticcated/login/LoginThunk';
import { AppDispatch } from '../../services/store/Store';
import { toast } from 'react-toastify';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useState } from 'react';
import UserModal from '../../components/home/UserModal';

const SideLayout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)

  const handleLogout = ()=>{
    dispatch(logoutUser())
    toast.success("Logged out successfully")
    navigate('/')
  }

  const { user, error } = useCurrentUser();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full h-full'>
      <div className='fixed top-0 left-0 z-auto border-r border-r-neutral-300 bg-neutral-100 shadow-md w-[20vw] h-screen hidden lg:block xl:block'>

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
            <div className={`border ${user?.profileImage ? 'border-none' : "border-neutral-700"} w-9 h-9 flex justify-center items-center rounded-full`} onClick={()=>setOpenModal(true)}>
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <p className="font-medium text-2xl font-inter capitalize text-center">
                  {user?.firstName?.charAt(0) || ""}
                </p>
              )}
            </div>
            <UserModal isOpen={openModal} onClose={()=>setOpenModal(false)} />
            <div className='flex-row items-center'>
              <h1 className='font-inter text-xs font-semibold'>{user?.lastName || ""} {user?.firstName}</h1>
              <p className="font-league font-light text-sm">{truncateText(user?.email || "", 15)}</p>
            </div>
          </div>
          <div onClick={handleLogout} className='flex items-center justify-center bg-red-500 w-8 h-8 rounded-full ml-auto'>
            <LuLogOut className='text-white' size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideLayout