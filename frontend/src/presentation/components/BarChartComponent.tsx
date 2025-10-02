import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartComponentProps {
  data: any[];
  title: string;
  dataKey: string;
  valueKey: string;
  color?: string;
}

export function BarChartComponent({
  data,
  title,
  dataKey,
  valueKey,
  color = '#667eea'
}: BarChartComponentProps) {
  if (!data || data.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={valueKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  empty: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
    color: '#999',
  },
};
