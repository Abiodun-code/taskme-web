import React from "react"

const CustomModal = ({ isOpen, onClose , children}: { isOpen: boolean, onClose: () => void, children:React.ReactNode }) => {
  if (!isOpen) return null

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg px-6 w-full lg:max-w-2xl max-w-sm xl:max-w-2xl h-auto overflow-y-scroll max-h-[70vh] shadow-md">
        {children}
      </div>
    </div>
  )
}

export default CustomModal