import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Mock data for development
const mockTransactions = [
  {
    _id: '1',
    amount: 3000,
    type: 'income',
    category: 'salary',
    description: 'Monthly Salary',
    date: '2023-09-01',
  },
  {
    _id: '2',
    amount: 500,
    type: 'expense',
    category: 'food',
    description: 'Groceries',
    date: '2023-09-05',
  },
  {
    _id: '3',
    amount: 200,
    type: 'expense',
    category: 'entertainment',
    description: 'Movie night',
    date: '2023-09-10',
  },
  {
    _id: '4',
    amount: 1000,
    type: 'income',
    category: 'investment',
    description: 'Stock dividends',
    date: '2023-09-15',
  },
  {
    _id: '5',
    amount: 400,
    type: 'expense',
    category: 'utilities',
    description: 'Electricity bill',
    date: '2023-09-20',
  },
];

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single transaction
router.get('/:id', async (req, res) => {
  try {
    const transaction = mockTransactions.find(t => t._id === req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    
    const newTransaction = new Transaction({
      amount,
      type,
      category,
      description,
      date: date || new Date(),
    });
    
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update transaction
router.put('/:id', async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, type, category, description, date },
      { new: true }
    );
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;