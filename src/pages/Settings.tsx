import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, User, Bell, Shield, Database, HelpCircle } from 'lucide-react';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Appearance Settings */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mr-3">
                <Sun className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Switch between light and dark themes
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="dark-mode-toggle"
                    checked={darkMode}
                    onChange={toggleTheme}
                    className="sr-only"
                  />
                  <label
                    htmlFor="dark-mode-toggle"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      darkMode ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mr-3">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Receive email notifications for important updates
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="email-notifications-toggle"
                    className="sr-only"
                    defaultChecked
                  />
                  <label
                    htmlFor="email-notifications-toggle"
                    className="block overflow-hidden h-6 rounded-full cursor-pointer bg-primary-600"
                  >
                    <span className="block h-6 w-6 rounded-full bg-white transform translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Alerts</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Get notified when you're close to exceeding your budget
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="budget-alerts-toggle"
                    className="sr-only"
                    defaultChecked
                  />
                  <label
                    htmlFor="budget-alerts-toggle"
                    className="block overflow-hidden h-6 rounded-full cursor-pointer bg-primary-600"
                  >
                    <span className="block h-6 w-6 rounded-full bg-white transform translate-x-6"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Currency and Data Settings */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mr-3">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Currency & Data</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  defaultValue="inr"
                  className="input"
                >
                  <option value="inr">INR (₹) - Indian Rupee</option>
                  <option value="usd">USD ($) - US Dollar</option>
                  <option value="eur">EUR (€) - Euro</option>
                  <option value="gbp">GBP (£) - British Pound</option>
                  <option value="jpy">JPY (¥) - Japanese Yen</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="data-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Format
                </label>
                <select
                  id="data-format"
                  name="data-format"
                  defaultValue="mm-dd-yyyy"
                  className="input"
                >
                  <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                  <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div className="pt-4">
                <button className="btn btn-danger flex items-center">
                  Export All Data
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Download all your financial data as a CSV file
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="card p-6 animate-slide-in-right">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mr-3">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Account</h2>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              
              <button className="w-full btn btn-secondary text-sm">
                Edit Profile
              </button>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Change Password
              </button>
              
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Linked Accounts
              </button>
              
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
          
          {/* Help & Support */}
          <div className="card p-6 animate-slide-in-right">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mr-3">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Help & Support</h2>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Documentation
              </button>
              
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                FAQ
              </button>
              
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
          </div>
          
          {/* App Info */}
          <div className="card p-6 animate-slide-in-right">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">About</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">FinTrack v1.0.0</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;