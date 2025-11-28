import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 mt-12 px-6 py-4 overflow-hidden">
      <ul className="flex flex-wrap justify-between text-zinc-500 text-base gap-4 md:gap-6">
        <li>
          <a href="/footerContent/about" className="hover:underline cursor-pointer">About Us</a>
        </li>
        <li>
          <a href="/footerContent/contact" className="hover:underline cursor-pointer">Contact Us</a>
        </li>
        <li>
          <a href="/help" className="hover:underline cursor-pointer">Help</a>
        </li>
        <li>
          <a href="/terms" className="hover:underline cursor-pointer">Terms & Conditions</a>
        </li>
        <li>
          <a href="/blogs" className="hover:underline cursor-pointer">Blogs</a>
        </li>
      </ul>

      <div className="mt-4 text-center text-zinc-600 text-sm">
        <p>© 2025 Codzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
