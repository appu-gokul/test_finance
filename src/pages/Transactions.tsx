import React, { useState } from 'react';
import { format } from 'date-fns';
import { PlusIcon, Search, ChevronDown, X, Edit, Trash2 } from 'lucide-react';
import { useTransactions, Transaction, TransactionType } from '../context/TransactionContext';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Apply filters and sort
  const filteredTransactions = transactions
    .filter(t => {
      // Search term
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by date or amount
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });
    
  // Get unique categories
  const categories = [...new Set(transactions.map(t => t.category))];
  
  const handleEditClick = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setShowAddModal(true);
  };
  
  const handleDeleteClick = (id?: string) => {
    if (id && confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditTransaction(null);
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Transaction
        </button>
      </div>
      
      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as TransactionType | 'all')}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            
            <div>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'date' | 'amount')}
                className="input"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
            
            <div>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="input"
              >
                <option value="desc">Newest/Highest</option>
                <option value="asc">Oldest/Lowest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="card animate-fade-in">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <tr 
                    key={transaction._id} 
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className={`px-6 py-4 text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEditClick(transaction)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(transaction._id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No transactions found. Try adjusting your filters or add a new transaction.
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
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TransactionForm 
              transaction={editTransaction || undefined} 
              onClose={handleCloseModal} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;