const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Income = require('../models/Income');
const { protect } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/income
// @desc    Get all income for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/income
// @desc    Create income
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
      const income = await Income.create({
        user: req.user._id,
        title,
        amount,
        category,
        description,
        date,
      });

      res.status(201).json(income);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE /api/income/:id
// @desc    Delete income
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    // Make sure user owns the income
    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await income.deleteOne();
    res.json({ message: 'Income removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/income/stats
// @desc    Get income statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id });
    
    const total = incomes.reduce((acc, income) => acc + income.amount, 0);
    
    const byCategory = incomes.reduce((acc, income) => {
      acc[income.category] = (acc[income.category] || 0) + income.amount;
      return acc;
    }, {});

    res.json({ total, byCategory, count: incomes.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;