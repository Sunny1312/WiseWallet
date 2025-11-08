const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Salary', 'Freelance', 'Business', 'Investment', 'Other'],
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
incomeSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Income', incomeSchema);