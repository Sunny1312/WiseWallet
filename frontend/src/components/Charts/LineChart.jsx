import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const LineChart = ({ incomes, expenses }) => {
    // Group by month
    const groupByMonth = (transactions) => {
      const grouped = {};
      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        grouped[monthYear] = (grouped[monthYear] || 0) + transaction.amount;
      });
      return grouped;
    };
  
    const incomeByMonth = groupByMonth(incomes);
    const expenseByMonth = groupByMonth(expenses);
  
    // Get all unique months and sort
    const allMonths = [
      ...new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)]),
    ].sort();
  
    if (allMonths.length === 0) {
      return (
        <div style={styles.empty}>
          <p>No data available yet. Add some transactions to see the trend!</p>
        </div>
      );
    }
  
    // Format month labels
    const labels = allMonths.map((month) => {
      const [year, monthNum] = month.split('-');
      const date = new Date(year, monthNum - 1);
      return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    });
  
    const incomeData = allMonths.map((month) => incomeByMonth[month] || 0);
    const expenseData = allMonths.map((month) => expenseByMonth[month] || 0);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '₹' + context.parsed.y.toLocaleString();
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '₹' + value.toLocaleString();
            },
          },
        },
      },
    };
  
    return (
      <div style={styles.container}>
        <Line data={chartData} options={options} />
      </div>
    );
  };
  
  const styles = {
    container: {
      width: '100%',
    },
    empty: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#9ca3af',
    },
  };
  
  export default LineChart;