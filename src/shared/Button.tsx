import React from 'react'
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: any;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  state?: unknown;
  disable?: boolean;
}

const CustomButton: React.FC<LinkButtonProps> = ({ disable, to, className = '', children, onClick, state, ...props }) => {


  return (
    <Link
      to={to}
      className={`bg-blue-500 hover:bg-gray-900 font-quick text-lg rounded-md w-full p-[.7rem] text-white text-center block ${className}`}
      {...props}
      onClick={onClick}
      state={state}
      aria-disabled={disable}
    >
      {children}
    </Link>
  );
};
export default CustomButton