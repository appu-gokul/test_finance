import React, { useState } from 'react';
import { PlusIcon, TrendingUp, TrendingDown, Wallet, CreditCard, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import TransactionForm from '../components/TransactionForm';
import { formatCurrency, formatCurrencyWithDecimals } from '../utils/currency';

const Dashboard = () => {
  const { transactions, totalIncome, totalExpenses, balance } = useTransactions();
  const [showAddModal, setShowAddModal] = useState(false);

  // Get recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Prepare data for the expense by category chart
  const expenseByCategoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce<Record<string, number>>((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

  const pieChartData = Object.keys(expenseByCategoryData).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: expenseByCategoryData[category],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF9C9C', '#B4E49C'];

  // Prepare data for the income vs expense chart
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toLocaleDateString('en-US', { month: 'short' });
  }).reverse();

  const incomeVsExpenseData = last6Months.map(month => {
    return {
      name: month,
      Income: Math.floor(Math.random() * 120000) + 30000, // Mock data in INR
      Expenses: Math.floor(Math.random() * 75000) + 15000, // Mock data in INR
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-fade-in">
        <StatCard 
          title="Balance" 
          value={formatCurrencyWithDecimals(balance)} 
          icon={<Wallet className="w-8 h-8 text-primary-500" />} 
          trend={balance > 0 ? 'up' : 'down'}
          trendValue={balance !== 0 ? `${Math.abs((balance / totalIncome) * 100).toFixed(1)}%` : '0%'}
        />
        <StatCard 
          title="Income" 
          value={formatCurrencyWithDecimals(totalIncome)} 
          icon={<TrendingUp className="w-8 h-8 text-green-500" />} 
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard 
          title="Expenses" 
          value={formatCurrencyWithDecimals(totalExpenses)} 
          icon={<TrendingDown className="w-8 h-8 text-red-500" />} 
          trend="down"
          trendValue="+8.2%"
        />
        <StatCard 
          title="Upcoming Bills" 
          value={formatCurrencyWithDecimals(1250)} 
          icon={<Calendar className="w-8 h-8 text-amber-500" />} 
          trend="alert"
          trendValue="Due in 5 days"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses Chart */}
        <div className="chart-container p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={incomeVsExpenseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [formatCurrency(Number(value)), undefined]}
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

        {/* Expense by Category Chart */}
        <div className="chart-container p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Expenses by Category</h2>
          {pieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
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
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), undefined]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No expense data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-6 animate-slide-in-right">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Recent Transactions</h2>
          <button 
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            onClick={() => {/* Handle view all click */}}
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {recentTransactions.length > 0 ? (
                recentTransactions.map(transaction => (
                  <tr 
                    key={transaction._id} 
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full capitalize">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrencyWithDecimals(transaction.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                    No recent transactions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add Transaction</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TransactionForm onClose={() => setShowAddModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral' | 'alert';
  trendValue: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-4">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">{value}</p>
        </div>
      </div>
      <div className="mt-2">
        <span className={`inline-flex items-center text-sm ${
          trend === 'up' ? 'text-green-600' :
          trend === 'down' ? 'text-red-600' :
          trend === 'alert' ? 'text-amber-600' :
          'text-gray-600'
        }`}>
          {trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
          {trend === 'alert' && <AlertCircle className="w-4 h-4 mr-1" />}
          {trendValue}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;