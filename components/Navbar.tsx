'use client';

import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar flex justify-between items-center w-full px-4 py-4 border-b-[.7px] bg-white border-b-zinc-500">
      
      <Link href={'/'} className="logo text-black">
        <h1 className='nav-title text-2xl md:text-3xl font-black'>Codzy</h1>
      </Link>

      <div className="flex items-center gap-4">
        
        <div className="help-btn flex items-center justify-center">
          <Link
            className='
                  px-5 py-2 text-sm
                  md:px-6 md:py-2 md:text-base
                  font-semibold border border-zinc-500
                  rounded-full hover:bg-zinc-200
                  ease-in-out duration-200 text-black'
            href="/help">
            Need Help
          </Link>
        </div>

        {session && (
          <Link 
            href="/profile" 
            className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-500 hover:ring-2 hover:ring-zinc-300 transition-all"
          >
            {session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="Profile" 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-700 font-bold">
                {session.user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar