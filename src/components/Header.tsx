import React from 'react';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <header className="z-10 py-4 bg-white dark:bg-gray-800 shadow-sm sticky top-0">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        {/* Mobile hamburger */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => setSidebarOpen(true)}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Search */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-lg dark:placeholder-gray-400 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              type="text"
              placeholder="Search transactions..."
              aria-label="Search"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-gray-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
          
          {/* Notifications */}
          <button className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
            <Bell className="w-6 h-6 text-gray-500" />
          </button>
          
          {/* Profile */}
          <button className="flex items-center focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;