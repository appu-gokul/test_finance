import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, CreditCard, PieChart, BarChart3, Settings, DollarSign } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <div className="flex items-center px-6 py-3">
            <DollarSign className="w-6 h-6 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">FinTrack</span>
          </div>
          <nav className="mt-6 px-2">
            {renderNavLinks()}
          </nav>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition-all transform ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">FinTrack</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <nav className="mt-6 px-2">
            {renderNavLinks()}
          </nav>
        </div>
      </div>
    </>
  );
};

const renderNavLinks = () => {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: CreditCard, label: 'Transactions' },
    { to: '/budgets', icon: PieChart, label: 'Budgets' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm font-semibold transition-colors rounded-lg ${
              isActive
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`
          }
        >
          <link.icon className="w-5 h-5" />
          <span className="ml-4">{link.label}</span>
        </NavLink>
      ))}
    </>
  );
};

export default Sidebar;