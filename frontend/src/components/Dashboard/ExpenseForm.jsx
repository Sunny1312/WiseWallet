import { useState } from 'react';
import api from '../../utils/api';

const ExpenseForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Entertainment',
    'Bills',
    'Healthcare',
    'Education',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/expense', {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setSuccess('Expense added successfully!');
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setTimeout(() => setSuccess(''), 3000);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Expense</h2>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="e.g., Grocery Shopping"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={styles.input}
              placeholder="0.00"
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Optional notes..."
            rows="3"
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Adding...' : '+ Add Expense'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  success: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.9rem',
  },
  input: {
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};

export default ExpenseForm;