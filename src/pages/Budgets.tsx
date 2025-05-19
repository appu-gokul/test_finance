import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PlusIcon, X, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

// Types
interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF9C9C', '#B4E49C'];

const mockBudgets: Budget[] = [
  { id: '1', category: 'Food', amount: 500, spent: 320, color: '#0088FE' },
  { id: '2', category: 'Housing', amount: 1200, spent: 1200, color: '#00C49F' },
  { id: '3', category: 'Transport', amount: 300, spent: 250, color: '#FFBB28' },
  { id: '4', category: 'Entertainment', amount: 200, spent: 180, color: '#FF8042' },
  { id: '5', category: 'Utilities', amount: 400, spent: 380, color: '#A28CFF' },
  { id: '6', category: 'Shopping', amount: 300, spent: 420, color: '#FF9C9C' },
];

const Budgets = () => {
  const { transactions } = useTransactions();
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editBudget, setEditBudget] = useState<Budget | null>(null);

  // Calculate total budget and spent amounts
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  
  // Prepare data for pie chart
  const budgetData = budgets.map(budget => ({
    name: budget.category,
    value: budget.amount,
    color: budget.color,
  }));
  
  const spentData = budgets.map(budget => ({
    name: budget.category,
    value: budget.spent,
    color: budget.color,
  }));

  const handleEditClick = (budget: Budget) => {
    setEditBudget(budget);
    setShowAddModal(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      setBudgets(budgets.filter(budget => budget.id !== id));
    }
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditBudget(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Budgets</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Budget
        </button>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 animate-fade-in">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Budget</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalBudget.toLocaleString()}</p>
          <div className="mt-2 text-xs text-gray-500">Monthly budget</div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Spent</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toLocaleString()}</p>
          <div className="mt-2 text-xs text-gray-500">
            {Math.round((totalSpent / totalBudget) * 100)}% of total budget
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Remaining</h3>
          <p className={`text-2xl font-bold ${
            remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>${Math.abs(remainingBudget).toLocaleString()}</p>
          <div className="mt-2 text-xs text-gray-500">
            {remainingBudget < 0 ? 'Over budget' : 'Under budget'}
          </div>
        </div>
      </div>

      {/* Budget Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-container p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Budget Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container p-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spentData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {spentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget List */}
      <div className="card p-6 animate-slide-in-right">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Your Budgets</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Budget</th>
                <th className="px-6 py-3">Spent</th>
                <th className="px-6 py-3">Remaining</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {budgets.map(budget => {
                const percentage = Math.round((budget.spent / budget.amount) * 100);
                const isOverBudget = budget.spent > budget.amount;
                
                return (
                  <tr key={budget.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {budget.category}
                    </td>
                    <td className="px-6 py-4">
                      ${budget.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      ${budget.spent.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 font-medium ${
                      isOverBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {isOverBudget 
                        ? `-$${(budget.spent - budget.amount).toLocaleString()}`
                        : `$${(budget.amount - budget.spent).toLocaleString()}`
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`h-2.5 rounded-full ${
                            isOverBudget 
                              ? 'bg-red-500' 
                              : percentage > 90 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 flex items-center">
                        <span>{percentage}%</span>
                        {isOverBudget && (
                          <span className="ml-2 flex items-center text-red-500">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Over budget
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEditClick(budget)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(budget.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {editBudget ? 'Edit Budget' : 'Add Budget'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const category = formData.get('category') as string;
              const amount = Number(formData.get('amount'));
              
              if (editBudget) {
                // Update existing budget
                setBudgets(budgets.map(budget => 
                  budget.id === editBudget.id 
                    ? { ...budget, category, amount } 
                    : budget
                ));
              } else {
                // Add new budget
                setBudgets([
                  ...budgets,
                  {
                    id: Date.now().toString(),
                    category,
                    amount,
                    spent: 0,
                    color: COLORS[budgets.length % COLORS.length],
                  },
                ]);
              }
              
              handleCloseModal();
            }}>
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={editBudget?.category || ''}
                  required
                  className="input"
                  placeholder="e.g., Food, Housing, Transport"
                />
              </div>
              
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    id="amount"
                    name="amount"
                    defaultValue={editBudget?.amount || ''}
                    required
                    min="0"
                    className="input pl-8"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editBudget ? 'Update' : 'Add'} Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;