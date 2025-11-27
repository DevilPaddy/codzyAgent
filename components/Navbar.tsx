import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center w-full px-4 py-4
    border-b-[.7px] bg-white border-b-zinc-500">
      <Link href={'/'} className="logo text-black">
        <h1 className='nav-title text-2xl md:text-3xl font-black'>Codzy</h1>
      </Link>
      <div className="help-btn flex items-center justify-center">
        <a
          className='
                    px-5 py-2 text-sm
                    md:px-6 md:py-2 md:text-base
                    font-semibold border border-zinc-500
        rounded-full hover:bg-zinc-200
        ease-in-out duration-200 text-black'
          href="/help">Need Help</a>
      </div>
    </div>
  )
}

export default Navbar