import React from 'react';
import { useForm } from 'react-hook-form';
import { useTransactions, Transaction, TransactionType, TransactionCategory } from '../context/TransactionContext';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onClose }) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const isEditMode = !!transaction;
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Transaction>({
    defaultValues: transaction || {
      type: 'expense',
      amount: 0,
      category: 'food',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });
  
  const transactionType = watch('type') as TransactionType;

  const incomeCategories: TransactionCategory[] = ['salary', 'investment', 'side-hustle', 'gift'];
  const expenseCategories: TransactionCategory[] = [
    'food', 'housing', 'transport', 'entertainment', 'utilities', 
    'healthcare', 'shopping', 'education', 'other'
  ];
  
  const onSubmit = async (data: Transaction) => {
    if (isEditMode && transaction._id) {
      await updateTransaction({ ...data, _id: transaction._id });
    } else {
      await addTransaction(data);
    }
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Transaction Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Transaction Type
          </label>
          <div className="flex">
            <label className={`flex-1 cursor-pointer flex items-center justify-center py-2 px-3 rounded-l-lg border ${
              transactionType === 'income' 
                ? 'bg-green-100 border-green-500 text-green-600 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
            }`}>
              <input
                type="radio"
                value="income"
                {...register('type')}
                className="sr-only"
              />
              <span className="text-sm font-medium">Income</span>
            </label>
            <label className={`flex-1 cursor-pointer flex items-center justify-center py-2 px-3 rounded-r-lg border ${
              transactionType === 'expense' 
                ? 'bg-red-100 border-red-500 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
            }`}>
              <input
                type="radio"
                value="expense"
                {...register('type')}
                className="sr-only"
              />
              <span className="text-sm font-medium">Expense</span>
            </label>
          </div>
        </div>
        
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              step="1"
              id="amount"
              {...register('amount', { 
                required: 'Amount is required',
                min: { value: 1, message: 'Amount must be greater than 0' }
              })}
              className={`input pl-8 ${errors.amount ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
          )}
        </div>
      </div>
      
      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className={`input ${errors.category ? 'border-red-500' : ''}`}
        >
          {transactionType === 'income' ? (
            incomeCategories.map(category => (
              <option key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))
          ) : (
            expenseCategories.map(category => (
              <option key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))
          )}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          {...register('description', { 
            required: 'Description is required',
            maxLength: { value: 50, message: 'Description must be less than 50 characters' }
          })}
          className={`input ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter a description"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
      
      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register('date', { required: 'Date is required' })}
          className={`input ${errors.date ? 'border-red-500' : ''}`}
        />
        {errors.date && (
          <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEditMode ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;