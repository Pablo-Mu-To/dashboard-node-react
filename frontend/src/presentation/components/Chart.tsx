import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { entidad: string; horas: number }[];
}

export function Chart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Horas por Entidad</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="entidad" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="horas" fill="#667eea" />
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