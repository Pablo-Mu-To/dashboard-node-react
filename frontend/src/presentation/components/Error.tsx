interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>⚠️</div>
      <h3 style={styles.title}>Error</h3>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px',
    margin: '20px',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#856404',
    fontSize: '18px',
  },
  message: {
    margin: 0,
    color: '#856404',
    fontSize: '14px',
  },
};