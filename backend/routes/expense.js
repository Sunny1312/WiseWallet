const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Expense = require('../models/Expense');
const { protect } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/expense
// @desc    Get all expenses for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/expense
// @desc    Create expense
// @access  Private
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, category, description, date } = req.body;

    try {
      const expense = await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
        description,
        date,
      });

      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE /api/expense/:id
// @desc    Delete expense
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/expense/stats
// @desc    Get expense statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    
    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json({ total, byCategory, count: expenses.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;