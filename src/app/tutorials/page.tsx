import Link from 'next/link';
import React from 'react';

const Tutorials = () => {
  return (
    <div className="w-full mt-[10rem]">
      <h6 className="m-4 text-lg text-black font-semibold mb-4">Tutorials:</h6>

      <div className="grid grid-cols-1 gap-8 mb-8 px-4 md:px-8">
        {/* Tutorial 1 */}
        <Link
        href={'https://youtu.be/MIF_WQ400cY'}
        >
          <div
            className="w-full h-[28rem] sm:h-[30rem] md:h-[33rem] rounded-[12px] bg-no-repeat bg-contain bg-center bg-[#EEEFF3] border-[1px]
            hover:scale-[102%] ease-in-out duration-150 border-zinc-500 p-4 sm:p-6 md:p-8 flex flex-col justify-between items-start"
            style={{ backgroundImage: "url('/tutorial1.jpg')" }}
          >
            <div className="h-full flex flex-col justify-between">
              <h4 className="text-xl sm:text-2xl md:text-3xl text-black font-bold mb-4">
                Learn to create website from just using prompt
              </h4>
              <p className='font-semibold text-zinc-700'>Watch Tutorial👉</p>
            </div>
          </div>
        </Link>

        {/* Tutorial 2 */}
        <div>
          <div
            className="w-full h-[28rem] sm:h-[30rem] md:h-[33rem] rounded-[12px] bg-no-repeat bg-contain bg-center
            hover:scale-[102%] ease-in-out duration-150 bg-white border-[1px] border-zinc-500 p-4 sm:p-6 md:p-8 flex flex-col justify-between items-start"
            style={{ backgroundImage: "url('/tutorial2.jpg')" }}
          >
            <div className="h-full flex flex-col justify-between">
              <h4 className="text-xl sm:text-2xl md:text-3xl text-black font-bold mb-4">
                Learn to deploy your website in simple steps
              </h4>
              <p className='font-semibold text-zinc-700'>Watch Tutorial👉</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
