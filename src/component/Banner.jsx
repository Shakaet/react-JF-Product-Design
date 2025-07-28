import React from 'react'
import bannerImg from "../assets/bannerImg.png"
import banner from "../assets/banner.png"
import Button from '../reusableComponent/Button'

const Banner = () => {
  return (
    <div>
       

       
      <div className="flex flex-col lg:flex-row items-center gap-10 bg-[#F2F4F6] px-4 py-6">
  {/* Banner with background and foreground image */}
  <div
    className="relative rounded-3xl w-full lg:w-[612px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[638px] bg-cover bg-center flex justify-center items-center"
    style={{
      backgroundImage: `url(${banner})`,
    }}
  >
    <img
      className="w-[90%] sm:w-[500px] lg:w-[529px] h-[90%] sm:h-[90%] lg:h-[544px] object-contain"
      src={bannerImg}
      alt=""
    />
  </div>

  {/* Text section */}
  <div className="space-y-6 text-center lg:text-left px-2">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
      JF Privezy Grass <br className="hidden sm:block" /> Wall
    </h2>
    <p className="text-lg sm:text-xl lg:text-2xl">The perfect Blend of Greenery</p>
    <Button>
        Shop Now
    </Button>
  </div>
</div>







    </div>
  )
}

export default Banner