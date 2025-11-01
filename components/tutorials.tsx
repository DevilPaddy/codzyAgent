import React from 'react';

const Tutorials = () => {
  return (
    <div className="w-full">
      <h6 className="m-4 text-lg text-white font-semibold mb-4">Tutorials:</h6>

      <div className="grid grid-cols-1 gap-8 mb-8 px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Tutorial 1 */}
        <div>
          <div
            className="w-full h-[28rem] sm:h-[30rem] md:h-[33rem] rounded-[12px] bg-no-repeat bg-contain bg-center bg-[#EEEFF3] p-4 sm:p-6 md:p-8 flex flex-col justify-between items-start"
            style={{ backgroundImage: "url('/tutorial1.jpg')" }}
          >
            <h4 className="text-xl sm:text-2xl md:text-3xl text-black font-bold mb-4">
              Learn to create website from just using prompt
            </h4>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2 rounded-lg text-white bg-violet-700 hover:bg-violet-800 transition"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Tutorial 2 */}
        <div>
          <div
            className="w-full h-[28rem] sm:h-[30rem] md:h-[33rem] rounded-[12px] bg-no-repeat bg-contain bg-center bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between items-start"
            style={{ backgroundImage: "url('/tutorial2.jpg')" }}
          >
            <h4 className="text-xl sm:text-2xl md:text-3xl text-black font-bold mb-4">
              Learn to deploy your website in simple steps
            </h4>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2 rounded-lg text-white bg-violet-700 hover:bg-violet-800 transition"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
