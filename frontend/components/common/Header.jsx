import { useState, useEffect } from 'react';
import SearchInput from '../headerItems/Search';
import Notification from '../headerItems/Notification';
import { FaRegBell } from 'react-icons/fa';
import { BsGrid } from 'react-icons/bs';

export default function Header({ showSearch = true }) {
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setAccountName(storedName);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full md:left-64 md:w-[calc(100%-16rem)] h-16 bg-gradient-to-b from-gray-50 to-orange-50 flex items-center justify-between px-6 shadow z-20">
      {/* Left Section: Greeting */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">Welcome Back</span>
        <span className="text-base font-semibold">{accountName || 'Guest'}</span>
      </div>

      {/* Center: Search Bar */}
      {showSearch && (
        <div className="flex items-center w-[40%] bg-gray-100 rounded-full px-4 py-1 shadow-sm">
          <SearchInput />
          <BsGrid className="text-gray-500" />
        </div>
      )}

      {/* Right: Notification + Profile */}
      <div className="flex items-center space-x-4">
        <Notification icon={<FaRegBell />} />
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          👤
        </button>
      </div>
    </header>
  );
}
