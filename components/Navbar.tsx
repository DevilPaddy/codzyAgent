import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center md:py-3 border-b-[1.4px] border-b-zinc-700 w-full px-[2vw] rounded-lg">
            <div className="logo bg-[linear-gradient(45deg,_rgba(65,89,208,1)_30%,_rgba(200,79,192,1)_20%,_rgba(255,205,112,1)_100%)] bg-clip-text">
                <h1 className='text-[5.65vh] font-semibold text-transparent'>Codzy</h1>
            </div>
            <div className="help-btn flex items-center justify-center">
                <a
                className='md:px-[2.4vw] md:py-[1vw] font-semibold border-[1.4px] border-zinc-700
                text-[1.4vw] rounded-full hover:bg-[linear-gradient(45deg,_rgba(65,89,208,1)_0%,_rgba(200,79,192,1)_50%,_rgba(255,205,112,1)_100%)]
                ease-in-out duration-200 hover:text-black' 
                href="/">Need Help</a>
            </div>
        </div>
  )
}

export default Navbar