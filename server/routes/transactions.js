import express from 'express';
// In a real setup, we'd import the model
// import Transaction from '../models/Transaction.js';

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
    // In production: const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    const transactions = mockTransactions;
    
    // Add a slight delay to simulate real API
    setTimeout(() => {
      res.json(transactions);
    }, 300);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single transaction
router.get('/:id', async (req, res) => {
  try {
    // In production: const transaction = await Transaction.findById(req.params.id);
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
    
    // In production:
    /*
    const newTransaction = new Transaction({
      amount,
      type,
      category,
      description,
      date,
      user: req.user.id
    });
    
    const savedTransaction = await newTransaction.save();
    */
    
    // Mock implementation
    const newTransaction = {
      _id: Date.now().toString(),
      amount,
      type,
      category,
      description,
      date: date || new Date().toISOString(),
    };
    
    mockTransactions.push(newTransaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update transaction
router.put('/:id', async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    
    // In production:
    /*
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, type, category, description, date },
      { new: true }
    );
    */
    
    // Mock implementation
    const index = mockTransactions.findIndex(t => t._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    mockTransactions[index] = {
      ...mockTransactions[index],
      amount,
      type,
      category,
      description,
      date,
    };
    
    res.json(mockTransactions[index]);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    // In production:
    /*
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Transaction.findByIdAndRemove(req.params.id);
    */
    
    // Mock implementation
    const index = mockTransactions.findIndex(t => t._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    mockTransactions.splice(index, 1);
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;