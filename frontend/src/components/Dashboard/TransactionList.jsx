import { useState } from 'react';
import api from '../../utils/api';

const TransactionList = ({ transactions, type, onDelete }) => {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    setDeleting(id);
    try {
      await api.delete(`/${type}/${id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (transactions.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No {type} transactions yet. Add your first one above!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Recent {type === 'income' ? 'Income' : 'Expenses'}
      </h2>
      <div style={styles.list}>
        {transactions.map((transaction) => (
          <div key={transaction._id} style={styles.item}>
            <div style={styles.itemLeft}>
              <div
                style={{
                  ...styles.categoryBadge,
                  background: type === 'income' ? '#d1fae5' : '#fee2e2',
                  color: type === 'income' ? '#065f46' : '#991b1b',
                }}
              >
                {transaction.category}
              </div>
              <div>
                <h3 style={styles.itemTitle}>{transaction.title}</h3>
                {transaction.description && (
                  <p style={styles.itemDescription}>{transaction.description}</p>
                )}
                <p style={styles.itemDate}>{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div style={styles.itemRight}>
              <p
                style={{
                  ...styles.amount,
                  color: type === 'income' ? '#10b981' : '#ef4444',
                }}
              >
                {type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(transaction._id)}
                disabled={deleting === transaction._id}
                style={styles.deleteBtn}
              >
                {deleting === transaction._id ? '...' : '🗑️'}
              </button>
            </div>
          </div>
        ))}
      </div>
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
  empty: {
    background: 'white',
    padding: '50px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    color: '#6b7280',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '10px',
    transition: 'transform 0.2s',
  },
  itemLeft: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
    flex: 1,
  },
  categoryBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  itemTitle: {
    margin: '0 0 5px 0',
    fontSize: '1.1rem',
    color: '#111827',
  },
  itemDescription: {
    margin: '0 0 5px 0',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  itemDate: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
  itemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  amount: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: 0,
  },
  deleteBtn: {
    padding: '8px 12px',
    background: '#fee2e2',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'background 0.2s',
  },
};

export default TransactionList;