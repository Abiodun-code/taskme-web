import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    </div>
  )
}

export default Spinner