import React from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
  className?: string;
  position?: 'center' | 'left' | 'right' | 'bottom';
};

const positionClasses: Record<NonNullable<CustomModalProps['position']>, string> = {
  center: "items-center justify-center",
  left: "items-center justify-start",
  right: "items-center justify-end",
  bottom: "items-end justify-center",
};

const CustomModal = ({
  isOpen,
  onClose,
  children,
  widthClass = "w-full max-w-sm lg:max-w-2xl xl:max-w-2xl",
  className = "",
  position = "center"
}: CustomModalProps) => {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className={`fixed inset-0 z-40 bg-black/30 flex ${positionClasses[position]} p-2`}
    >
      <div
        className={`bg-white rounded-lg shadow-md overflow-y-auto max-h-[95vh] ${widthClass} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
