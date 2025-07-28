import React from 'react'

const Button = ({children}) => {
  return (

    <button className="bg-[#B0DD1D] py-3 px-6 rounded-3xl sm:w-36  sm:h-12 font-semibold text-sm sm:text-base">
      {children}
    </button>

  )
}

export default Button