import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Types
export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 
  | 'salary' | 'investment' | 'side-hustle' | 'gift' // income categories
  | 'food' | 'housing' | 'transport' | 'entertainment' | 'utilities' | 'healthcare' | 'shopping' | 'education' | 'other'; // expense categories

export interface Transaction {
  _id?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

type TransactionAction =
  | { type: 'FETCH_TRANSACTIONS_START' }
  | { type: 'FETCH_TRANSACTIONS_SUCCESS'; payload: Transaction[] }
  | { type: 'FETCH_TRANSACTIONS_ERROR'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction };

// Mock data for initial development
const mockTransactions: Transaction[] = [
  {
    _id: '1',
    amount: 90000,
    type: 'income',
    category: 'salary',
    description: 'Monthly Salary',
    date: '2023-09-01',
  },
  {
    _id: '2',
    amount: 15000,
    type: 'expense',
    category: 'food',
    description: 'Groceries',
    date: '2023-09-05',
  },
  {
    _id: '3',
    amount: 6000,
    type: 'expense',
    category: 'entertainment',
    description: 'Movie night',
    date: '2023-09-10',
  },
  {
    _id: '4',
    amount: 30000,
    type: 'income',
    category: 'investment',
    description: 'Stock dividends',
    date: '2023-09-15',
  },
  {
    _id: '5',
    amount: 12000,
    type: 'expense',
    category: 'utilities',
    description: 'Electricity bill',
    date: '2023-09-20',
  },
];

const calculateTotals = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
};

const transactionReducer = (state: TransactionState, action: TransactionAction): TransactionState => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_TRANSACTIONS_SUCCESS':
      const { totalIncome, totalExpenses, balance } = calculateTotals(action.payload);
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        totalIncome,
        totalExpenses,
        balance,
      };
    case 'FETCH_TRANSACTIONS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_TRANSACTION':
      const updatedTransactions = [...state.transactions, action.payload];
      return {
        ...state,
        transactions: updatedTransactions,
        ...calculateTotals(updatedTransactions),
      };
    case 'DELETE_TRANSACTION':
      const filteredTransactions = state.transactions.filter(t => t._id !== action.payload);
      return {
        ...state,
        transactions: filteredTransactions,
        ...calculateTotals(filteredTransactions),
      };
    case 'UPDATE_TRANSACTION':
      const updatedTxns = state.transactions.map(t => 
        t._id === action.payload._id ? action.payload : t
      );
      return {
        ...state,
        transactions: updatedTxns,
        ...calculateTotals(updatedTxns),
      };
    default:
      return state;
  }
};

interface TransactionContextType extends TransactionState {
  addTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  fetchTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType>({
  ...initialState,
  addTransaction: async () => {},
  deleteTransaction: async () => {},
  updateTransaction: async () => {},
  fetchTransactions: async () => {},
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // For development, using mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        dispatch({ type: 'FETCH_TRANSACTIONS_START' });
        // In a real app, this would be: const response = await axios.get('/api/transactions');
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch({ 
          type: 'FETCH_TRANSACTIONS_SUCCESS', 
          payload: mockTransactions 
        });
      } catch (error) {
        dispatch({ 
          type: 'FETCH_TRANSACTIONS_ERROR', 
          payload: 'Failed to fetch transactions' 
        });
      }
    };

    loadMockData();
  }, []);

  const fetchTransactions = async () => {
    try {
      dispatch({ type: 'FETCH_TRANSACTIONS_START' });
      // In production this would be:
      // const response = await axios.get('/api/transactions');
      // dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESS', payload: response.data });
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESS', payload: mockTransactions });
    } catch (error) {
      let errorMessage = 'Failed to fetch transactions';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({ type: 'FETCH_TRANSACTIONS_ERROR', payload: errorMessage });
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    try {
      // In production this would be:
      // const response = await axios.post('/api/transactions', transaction);
      // dispatch({ type: 'ADD_TRANSACTION', payload: response.data });
      
      // Mock implementation
      const newTransaction = {
        ...transaction,
        _id: Date.now().toString(),
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      // In production this would be:
      // await axios.delete(`/api/transactions/${id}`);
      
      // Mock implementation
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      // In production this would be:
      // const response = await axios.put(`/api/transactions/${transaction._id}`, transaction);
      // dispatch({ type: 'UPDATE_TRANSACTION', payload: response.data });
      
      // Mock implementation
      dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        ...state,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};