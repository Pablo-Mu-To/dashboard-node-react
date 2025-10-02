import { useMetrics } from '../../application/useMetrics';
import { KpiCard } from '../components/KpiCard';
import { Chart } from '../components/Chart';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export function Dashboard() {
  const { metrics, loading, error } = useMetrics();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!metrics) return <Error message="No se encontraron datos" />;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Luntia Dashboard</h1>
        <p style={styles.subtitle}>Panel de control de voluntariado</p>
      </header>

      <div style={styles.kpiGrid}>
        <KpiCard
          title="Voluntarios Activos"
          value={metrics.voluntariosActivos}
          icon="👥"
        />
        <KpiCard
          title="Horas Totales"
          value={metrics.horasTotales.toFixed(1)}
          icon="⏱️"
        />
        <KpiCard
          title="Turnos Último Mes"
          value={metrics.turnosUltimoMes}
          icon="📅"
        />
        <KpiCard
          title="Donaciones"
          value={`${metrics.donacionesTotales.toFixed(2)}€`}
          icon="💰"
        />
        <KpiCard
          title="Actividades"
          value={metrics.actividadesRealizadas}
          icon="🎯"
        />
      </div>

      <div style={styles.chartSection}>
        <Chart data={metrics.horasPorEntidad} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#7f8c8d',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto 40px',
  },
  chartSection: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
};