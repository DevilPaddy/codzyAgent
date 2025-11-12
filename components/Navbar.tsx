import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center w-full px-4 py-4 rounded-lg">
      <div className="logo text-black">
        <h1 className='text-2xl md:text-3xl font-semibold'>Codzy</h1>
      </div>
      <div className="help-btn flex items-center justify-center">
        <a
          className='
                    px-5 py-2 text-sm
                    md:px-6 md:py-2 md:text-base
                    font-semibold border border-zinc-400
        rounded-full hover:bg-zinc-100
        ease-in-out duration-200 text-black'
          href="/">Need Help</a>
      </div>
    </div>
  )
}

export default Navbar