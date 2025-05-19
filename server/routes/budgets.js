import express from 'express';
// In a real setup, we'd import the model
// import Budget from '../models/Budget.js';

const router = express.Router();

// Mock data for development
const mockBudgets = [
  { id: '1', category: 'Food', amount: 500, spent: 320, period: 'monthly' },
  { id: '2', category: 'Housing', amount: 1200, spent: 1200, period: 'monthly' },
  { id: '3', category: 'Transport', amount: 300, spent: 250, period: 'monthly' },
  { id: '4', category: 'Entertainment', amount: 200, spent: 180, period: 'monthly' },
  { id: '5', category: 'Utilities', amount: 400, spent: 380, period: 'monthly' },
  { id: '6', category: 'Shopping', amount: 300, spent: 420, period: 'monthly' },
];

// GET all budgets
router.get('/', async (req, res) => {
  try {
    // In production: const budgets = await Budget.find({ user: req.user.id });
    const budgets = mockBudgets;
    
    // Add a slight delay to simulate real API
    setTimeout(() => {
      res.json(budgets);
    }, 300);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single budget
router.get('/:id', async (req, res) => {
  try {
    // In production: const budget = await Budget.findById(req.params.id);
    const budget = mockBudgets.find(b => b.id === req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.json(budget);
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new budget
router.post('/', async (req, res) => {
  try {
    const { category, amount, period, notes } = req.body;
    
    // In production:
    /*
    const newBudget = new Budget({
      category,
      amount,
      period,
      notes,
      user: req.user.id,
    });
    
    const savedBudget = await newBudget.save();
    */
    
    // Mock implementation
    const newBudget = {
      id: Date.now().toString(),
      category,
      amount,
      spent: 0, // Initial spent is 0
      period: period || 'monthly',
      notes,
    };
    
    mockBudgets.push(newBudget);
    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update budget
router.put('/:id', async (req, res) => {
  try {
    const { category, amount, period, notes } = req.body;
    
    // In production:
    /*
    let budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user owns this budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { category, amount, period, notes },
      { new: true }
    );
    */
    
    // Mock implementation
    const index = mockBudgets.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    mockBudgets[index] = {
      ...mockBudgets[index],
      category,
      amount,
      period: period || mockBudgets[index].period,
      notes,
    };
    
    res.json(mockBudgets[index]);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE budget
router.delete('/:id', async (req, res) => {
  try {
    // In production:
    /*
    let budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user owns this budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Budget.findByIdAndRemove(req.params.id);
    */
    
    // Mock implementation
    const index = mockBudgets.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    mockBudgets.splice(index, 1);
    res.json({ message: 'Budget removed' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;