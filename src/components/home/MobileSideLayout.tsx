import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/task-blue.png";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useState } from "react";
import { truncateText } from "../../utils/TruncateText";
import UserModal from "./UserModal";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/store/not-authenticcated/login/LoginThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store/Store";

const MobileSideLayout = ({ handleClickOut, setMobile }: { handleClickOut: (e: React.MouseEvent<HTMLDivElement>) => void, setMobile: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = useCurrentUser();
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(logoutUser())
    toast.success("Logged out successfully")
    navigate('/')
  
  }

  return (
    <div
      onClick={handleClickOut}
      className={`fixed inset-0 z-20 top-0 left-0 right-0 w-auto bg-black bg-opacity-50 block 'xl:hidden lg:hidden`}
    >
     <div className="w-[70vw] bg-white h-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <figure className="w-full">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="w-full h-[3rem] max-w-[10rem]  object-cover"
              />
            </Link>
          </figure>
          <div className="cursor-pointer">
            <FaTimes size={'1.5rem'} onClick={()=>setMobile(false)} />
          </div>
        </div>
        <div className=' absolute bottom-5 w-full flex items-center justify-between px-[1rem]'>
          <div className='flex items-center space-x-2'>
            <div className={`border ${user?.profileImage ? 'border-none' : "border-neutral-700"} w-9 h-9 flex justify-center items-center rounded-full`} onClick={() => setOpenModal(true)}>
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <p className="font-medium text-2xl font-inter capitalize text-center">
                  {user?.firstName?.charAt(0) || ""}
                </p>
              )}
            </div>
            <UserModal isOpen={openModal} onClose={() => setOpenModal(false)} />
            <div className='flex-row items-center'>
              <h1 className='font-inter text-xs font-semibold'>{user?.lastName || ""} {user?.firstName}</h1>
              <p className="font-league font-light text-sm">{truncateText(user?.email || "", 15)}</p>
            </div>
          </div>
          <div onClick={handleLogout} className='flex items-center justify-center bg-red-500 w-8 h-8 mx-auto rounded-full'>
            <LuLogOut className='text-white' size={16} />
          </div>
        </div>
     </div>
    </div>
  )
}

export default MobileSideLayout