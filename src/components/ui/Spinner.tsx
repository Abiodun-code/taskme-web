import React from 'react'

type Props = {
  className?: string
}

const Spinner = ({className}: Props) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className={`${className} w-6 h-6 border-2 border-red-700 border-t-transparent rounded-full animate-spin`}></span>
    </div>
  )
}

export default Spinner