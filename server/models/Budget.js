import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Budget amount is required'],
    min: [0, 'Budget amount must be greater than 0']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // In a real app, this would be required to link budgets to users
    // required: true
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  startDate: {
    type: Date,
    default: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // First day of current month
  },
  endDate: {
    type: Date,
    default: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) // Last day of current month
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for tracking progress
budgetSchema.virtual('spent').get(function() {
  // This would be implemented to calculate the spent amount from transactions
  // For mock purposes, we'll return a random amount between 0 and the budget amount
  return Math.random() * this.amount;
});

budgetSchema.virtual('remaining').get(function() {
  return this.amount - this.spent;
});

budgetSchema.virtual('percentUsed').get(function() {
  return (this.spent / this.amount) * 100;
});

// Index for efficient queries
budgetSchema.index({ user: 1, category: 1 });

export default mongoose.model('Budget', budgetSchema);