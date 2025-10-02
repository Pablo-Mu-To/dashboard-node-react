interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <div style={styles.card}>
      {icon && <div style={styles.icon}>{icon}</div>}
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.value}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'default',
  },
  icon: {
    fontSize: '36px',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  value: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
};