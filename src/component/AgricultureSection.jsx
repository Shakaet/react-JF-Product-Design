import React from 'react'
import productImg1 from "../assets/a1.png";
import productImg2 from "../assets/a2.png";
import productImg3 from "../assets/a3.png";
import productImg4 from "../assets/a4.png";

import Card from '../reusableComponent/Card';

const AgricultureSection = () => {
  return (
    <div className='mt-25 mb-5'>
  <h2 className='font-bold text-[42px] ms-5'>Agricultural Products</h2>

  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-7'>
    <Card productImg={productImg1} text="JF Barbed Wire- 270 GSM" salary="₹4,995.00" />
    <Card productImg={productImg2} text="FGC RustFree Fencing Poles" salary="₹499.00 – ₹1,589.00" />
    <Card productImg={productImg3} text="GI Poultry Mesh" salary="₹1,260.00 – ₹10,750.00" />
    <Card productImg={productImg4} text="JF Bluelink Mesh" salary="₹3,067.50 – ₹6,362.50" />
  </div>
</div>

  )
}

export default AgricultureSection