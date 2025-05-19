import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

// Mock data for demonstration
const monthlyData = [
  { name: 'Jan', Income: 4000, Expenses: 2400 },
  { name: 'Feb', Income: 3500, Expenses: 2200 },
  { name: 'Mar', Income: 3800, Expenses: 2800 },
  { name: 'Apr', Income: 4200, Expenses: 2600 },
  { name: 'May', Income: 3900, Expenses: 2900 },
  { name: 'Jun', Income: 4100, Expenses: 3100 },
];

const categoryExpenseData = [
  { name: 'Food', value: 800 },
  { name: 'Housing', value: 1200 },
  { name: 'Transport', value: 400 },
  { name: 'Entertainment', value: 300 },
  { name: 'Utilities', value: 500 },
  { name: 'Others', value: 200 },
];

const savingsTrendData = [
  { name: 'Jan', amount: 1600 },
  { name: 'Feb', amount: 1300 },
  { name: 'Mar', amount: 1000 },
  { name: 'Apr', amount: 1600 },
  { name: 'May', amount: 1000 },
  { name: 'Jun', amount: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF9C9C'];

const Reports = () => {
  const { transactions } = useTransactions();
  const [dateRange, setDateRange] = useState('monthly');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Financial Reports</h1>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="input pr-10 py-2"
            >
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
              <option value="quarterly">Last 3 Months</option>
              <option value="yearly">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <button className="btn btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 animate-fade-in">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Income</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$23,500</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <span className="font-medium">↑ 12%</span>
            <span className="text-xs text-gray-500 ml-2">vs last period</span>
          </p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$16,000</p>
          <p className="text-sm text-red-600 flex items-center mt-2">
            <span className="font-medium">↑ 8%</span>
            <span className="text-xs text-gray-500 ml-2">vs last period</span>
          </p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Net Savings</h3>
          <p className="text-2xl font-bold text-green-600">$7,500</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <span className="font-medium">↑ 18%</span>
            <span className="text-xs text-gray-500 ml-2">vs last period</span>
          </p>
        </div>
      </div>

      {/* Income vs Expenses Chart */}
      <div className="card p-6 mb-6 animate-slide-up">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#2563EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Expenses by Category */}
        <div className="card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryExpenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryExpenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Trend */}
        <div className="card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Savings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={savingsTrendData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Savings']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="amount" stroke="#10B981" fillOpacity={1} fill="url(#savingsGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Spending Breakdown */}
      <div className="card p-6 animate-slide-in-right">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Spending Patterns</h2>
        <p className="text-sm text-gray-500 mb-6">View your spending patterns over time by category to identify trends.</p>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="Income" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Expenses" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;