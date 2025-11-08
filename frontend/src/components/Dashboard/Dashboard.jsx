import { useState, useEffect } from 'react';
import api from '../../utils/api';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        api.get('/income'),
        api.get('/expense'),
      ]);
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const incomesByCategory = incomes.reduce((acc, income) => {
    acc[income.category] = (acc[income.category] || 0) + income.amount;
    return acc;
  }, {});

  if (loading) {
    return <div style={styles.loading}>Loading your financial data...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Your Financial Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={{ ...styles.card, ...styles.incomeCard }}>
          <h3 style={styles.cardTitle}>💰 Total Income</h3>
          <p style={styles.cardAmount}>₹{totalIncome.toLocaleString()}</p>
        </div>
        <div style={{ ...styles.card, ...styles.expenseCard }}>
          <h3 style={styles.cardTitle}>💸 Total Expenses</h3>
          <p style={styles.cardAmount}>₹{totalExpense.toLocaleString()}</p>
        </div>
        <div style={{ ...styles.card, ...styles.balanceCard }}>
          <h3 style={styles.cardTitle}>💼 Balance</h3>
          <p style={{ ...styles.cardAmount, color: balance >= 0 ? '#10b981' : '#ef4444' }}>
            ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('overview')}
          style={activeTab === 'overview' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('income')}
          style={activeTab === 'income' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          style={activeTab === 'expense' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
        >
          Expenses
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div style={styles.overview}>
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Expense Breakdown</h3>
              <PieChart data={expensesByCategory} />
            </div>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Income Sources</h3>
              <PieChart data={incomesByCategory} />
            </div>
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Income vs Expenses Trend</h3>
            <LineChart incomes={incomes} expenses={expenses} />
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div style={styles.tabContent}>
          <IncomeForm onSuccess={fetchData} />
          <TransactionList
            transactions={incomes}
            type="income"
            onDelete={fetchData}
          />
        </div>
      )}

      {activeTab === 'expense' && (
        <div style={styles.tabContent}>
          <ExpenseForm onSuccess={fetchData} />
          <TransactionList
            transactions={expenses}
            type="expense"
            onDelete={fetchData}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
  },
  header: {
    marginBottom: '30px',
  },
  loading: {
    textAlign: 'center',
    padding: '100px',
    fontSize: '1.2rem',
    color: '#666',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  incomeCard: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  expenseCard: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  balanceCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  cardTitle: {
    fontSize: '1rem',
    marginBottom: '10px',
    opacity: 0.9,
  },
  cardAmount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '2px solid #e5e7eb',
  },
  tab: {
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#6b7280',
    fontWeight: '500',
    transition: 'all 0.3s',
    borderBottom: '3px solid transparent',
  },
  activeTab: {
    color: '#667eea',
    borderBottom: '3px solid #667eea',
    fontWeight: 'bold',
  },
  overview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  chartCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.2rem',
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
};

export default Dashboard;