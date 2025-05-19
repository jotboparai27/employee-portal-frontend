const DashboardCard = ({ title, value }) => {
  const color = value > 0 ? '#4caf50' : '#f44336';

  return (
    <div style={{ ...styles.card, borderColor: color }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f3f4f6',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '2px solid transparent',
  },
};

export default DashboardCard;
