import React from 'react'
import productImg1 from "../assets/l1.png";
import productImg2 from "../assets/l2.png";
import productImg3 from "../assets/l3.png";
import productImg4 from "../assets/l4.png";
import Card from '../reusableComponent/Card';

const LandScape = () => {
  return (
    <div>

         <div className='mt-25 mb-5'>
  <h2 className=' font-bold text-[42px] ms-5'>Landscape Products</h2>

  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-7'>
    <Card productImg={productImg1} text="Antiqo Fence" salary="₹10,024.00 – ₹14,984.82" />
    <Card productImg={productImg2} text="JF Australian Trellis" salary="₹6,962.00" />
    <Card productImg={productImg3} text="JF Polyhex Mesh" salary="₹4,050.00 – ₹10,770.00" />
    <Card productImg={productImg4} text="JF Privezy Grass Wall" salary="₹1,646.10 – ₹18,284.10" />
  </div>
</div>



    </div>
  )
}

export default LandScape