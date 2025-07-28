import React from 'react'
import logo from "../assets/jf.png"
import user from "../assets/user.png"
import search from "../assets/research.png"
import cart from "../assets/card.png"


const NavBar = () => {
  return (
  <nav className="mt-2 mb-2 ms-1 mr-1 px-2">
  <div className="flex justify-between items-center flex-wrap lg:flex-nowrap">
    {/* Left nav links */}
    <div className="text-xl flex gap-6 lg:gap-8 w-full lg:w-auto justify-center lg:justify-start order-2 lg:order-1 mt-4 lg:mt-0">
      <a href="#">Home</a>
      <a href="#">Shop</a>
      <a href="#">Blogs</a>
      <a href="#">Contact</a>
    </div>

    {/* Logo */}
    <div className="order-1 lg:order-2 w-full lg:w-auto flex justify-center">
      <img className="w-24 h-24 lg:w-32 lg:h-36" src={logo} alt="Logo" />
    </div>

    {/* Right icons */}
    <div className="flex justify-center text-xl gap-4 lg:gap-8 w-full lg:w-auto order-3 mt-4 lg:mt-0">
      <a className="flex items-center gap-2" href="#">
        Login
        <img className="w-5 h-5 lg:w-6 lg:h-6" src={user} alt="User" />
      </a>

      <img className="w-5 h-5 lg:w-6 lg:h-6" src={search} alt="Search" />

      <img className="w-5 h-5 lg:w-6 lg:h-6" src={cart} alt="Cart" />
    </div>
  </div>
</nav>

  )
}

export default NavBar