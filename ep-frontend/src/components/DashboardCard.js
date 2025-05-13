const DashboardCard = ({ title, value }) => {
  return (
    <div style={styles.card}>
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
  },
};

export default DashboardCard;
