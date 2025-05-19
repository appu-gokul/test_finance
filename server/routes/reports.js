import express from 'express';

const router = express.Router();

// Mock data for reports
const mockMonthlyData = [
  { month: 1, income: 4000, expense: 2400, savings: 1600 },
  { month: 2, income: 3500, expense: 2200, savings: 1300 },
  { month: 3, income: 3800, expense: 2800, savings: 1000 },
  { month: 4, income: 4200, expense: 2600, savings: 1600 },
  { month: 5, income: 3900, expense: 2900, savings: 1000 },
  { month: 6, income: 4100, expense: 3100, savings: 1000 },
];

const mockCategoryData = {
  food: 800,
  housing: 1200,
  transport: 400,
  entertainment: 300,
  utilities: 500,
  other: 200,
};

// GET monthly income vs expenses
router.get('/monthly', (req, res) => {
  try {
    // In a real app, this would query the database
    // const { year } = req.query;
    
    // Add a slight delay to simulate real API
    setTimeout(() => {
      res.json({
        data: mockMonthlyData,
        totalIncome: mockMonthlyData.reduce((sum, item) => sum + item.income, 0),
        totalExpense: mockMonthlyData.reduce((sum, item) => sum + item.expense, 0),
        totalSavings: mockMonthlyData.reduce((sum, item) => sum + item.savings, 0),
      });
    }, 300);
  } catch (error) {
    console.error('Error fetching monthly report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET expense breakdown by category
router.get('/categories', (req, res) => {
  try {
    // In a real app, this would query the database
    // const { month, year } = req.query;
    
    // Format the data for the frontend
    const formattedData = Object.entries(mockCategoryData).map(([category, value]) => ({
      category,
      value,
      percentage: (value / Object.values(mockCategoryData).reduce((a, b) => a + b, 0)) * 100,
    }));
    
    // Add a slight delay to simulate real API
    setTimeout(() => {
      res.json({
        data: formattedData,
        total: Object.values(mockCategoryData).reduce((a, b) => a + b, 0),
      });
    }, 300);
  } catch (error) {
    console.error('Error fetching category report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET yearly summary
router.get('/yearly', (req, res) => {
  try {
    // In a real app, this would aggregate yearly data
    // const { year } = req.query;
    
    // Mock yearly summary data
    const yearlySummary = {
      totalIncome: 45000,
      totalExpense: 32000,
      totalSavings: 13000,
      savingsRate: 28.9, // percentage
      highestIncomeMonth: 'April',
      highestExpenseMonth: 'March',
      categories: {
        highestExpense: {
          category: 'Housing',
          amount: 14400,
          percentage: 45
        },
        lowestExpense: {
          category: 'Entertainment',
          amount: 3600,
          percentage: 11.25
        }
      }
    };
    
    // Add a slight delay to simulate real API
    setTimeout(() => {
      res.json(yearlySummary);
    }, 300);
  } catch (error) {
    console.error('Error fetching yearly report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;