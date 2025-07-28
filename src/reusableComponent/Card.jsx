import React from 'react'
import Button from './Button'

const Card = ({productImg,text,salary}) => {
  return (
    <div>

         <div className="p-4 rounded-lg shadow-md bg-[#F2F4F6] w-[305px] h-[383px] flex flex-col items-center justify-between">
  <img
    src={productImg}
    alt=""
    className="w-[245px] h-[220px] object-cover rounded-md"
  />

  <div className=" mt-4">
    <h2 className="text-lg font-bold">{text}</h2>
    <p className="text-sm font-semibold text-gray-500">{salary}</p>

    <div className="mt-4">
      <Button>Shop Now</Button>
    </div>
  </div>
</div>

    </div>
  )
}

export default Card