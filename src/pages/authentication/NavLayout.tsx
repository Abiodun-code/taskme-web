import { IoMdNotificationsOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../utils/GetPageTitle';
import { useState, useRef, useEffect } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import MobileSideLayout from "../../components/home/MobileSideLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/Store";

const NavLayout = () => {

  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const notifications = useSelector((state: RootState) => state.notification.list);

  const handleClickOutside = (e: MouseEvent) => {
    if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='flex justify-between items-center relative'>
      <div className="flex items-center gap-4">
        <div className='lg:hidden cursor-pointer xl:hidden' onClick={() => setMobile(!mobile)}>
          <FaBarsStaggered size={'1.5rem'} />
        </div>
        {mobile && <MobileSideLayout handleClickOut={(e) => {
          if (e.target === e.currentTarget) setMobile(false);
        }} setMobile={setMobile} />}
        <h1 className='font-inter text-[1rem] font-medium leading-[3rem]'>{getPageTitle(location.pathname)}</h1>
      </div>

      {/* Notification Bell */}
      <div className="relative" ref={bellRef}>
        <div className="cursor-pointer" onClick={() => setDropdownOpen(prev => !prev)}>
          <IoMdNotificationsOutline size={"1.9rem"} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            <div className="p-4 border-b font-semibold">Notifications</div>
            {notifications.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">No notifications</div>
            ) : (
              <ul>
                {notifications.map((notif, index) => (
                  <li key={index} className="p-4 border-b hover:bg-gray-100 cursor-pointer font-league text-sm">
                    {notif.message}
                    <div className="text-gray-400 text-xs mt-1">{new Date(notif.timestamp).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavLayout;
