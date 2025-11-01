import React from 'react';

const ideaData = [
  { id: 1, image: '/idea1.jng', title: 'Portfolio’s idea', url: 'https://example.com/idea1' },
  { id: 2, image: '/idea2.jpg', title: 'Landing pages', url: 'https://example.com/idea2' },
  { id: 3, image: '/idea3.jpg', title: 'Product page', url: 'https://example.com/idea3' },
  { id: 4, image: '/idea4.jpg', title: 'Other ideas', url: 'https://example.com/idea4' },
];

const IdeasHome = () => {
  return (
    <div className="w-full mt-12 mb-12">
      <h6 className="text-white text-lg m-4">Ideas:</h6>

      {/* Responsive Grid: 1 col on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8">
        {ideaData.map(({ id, image, title, url }) => (
          <div
            key={id}
            className="relative h-[28rem] bg-white rounded-[12px] bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 p-4 rounded-xl flex flex-col justify-between items-start">
              <h4 className="text-2xl text-black font-semibold mb-4">{title}</h4>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-violet-700 hover:bg-violet-800 transition text-white"
              >
                Explore
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeasHome;
