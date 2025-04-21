import React from 'react';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  state?: unknown;
  disable?: boolean;
}

const CustomButton: React.FC<LinkButtonProps> = ({ disable, to, className = '', children, onClick, state, ...props }) => {
  if (to) {
    // If 'to' is provided, render a Link (navigation)
    return (
      <Link
        to={to}
        className={`bg-blue-500 hover:bg-gray-900 font-medium font-inter text-base rounded-md w-full p-[.7rem] text-white text-center block ${className}`}
        {...props}
        onClick={onClick}
        state={state}
        aria-disabled={disable}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a real <button> (for actions like saving)
  return (
    <button
      type="button"
      className={`bg-blue-500 hover:bg-gray-900 font-medium font-inter text-base rounded-md w-full p-[.7rem] text-white text-center block ${className}`}
      {...props}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default CustomButton;
