import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be greater than 0']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [100, 'Description cannot be more than 100 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // In a real app, this would be required to link transactions to users
    // required: true
  }
}, {
  timestamps: true
});

// Create index for efficient queries
transactionSchema.index({ user: 1, date: -1 });

// Static method to get monthly stats
transactionSchema.statics.getMonthlyStats = async function(userId, year) {
  const stats = await this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { 
          month: { $month: "$date" },
          type: "$type" 
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $group: {
        _id: "$_id.month",
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0]
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  return stats;
};

// Method to calculate balance
transactionSchema.statics.getBalance = async function(userId) {
  const result = await this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  const income = result.find(item => item._id === 'income')?.total || 0;
  const expense = result.find(item => item._id === 'expense')?.total || 0;
  
  return income - expense;
};

// Using export default directly since we're using ES modules
export default mongoose.model('Transaction', transactionSchema);