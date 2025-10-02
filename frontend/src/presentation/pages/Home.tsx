import { useMetrics } from '../../application/useMetrics';
import { KpiCard } from '../components/KpiCard';
import { Chart } from '../components/Chart';
import { BarChartComponent } from '../components/BarChartComponent';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import './Home.css';

export function Home() {
  const { metrics, loading, error } = useMetrics();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!metrics) return <Error message="No se encontraron datos" />;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Dashboard de Métricas</h1>
        <p className="home-subtitle">Panel de control de voluntariado y actividades</p>
      </header>

      <div className="kpi-grid">
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

      <div className="chart-section">
        <div className="charts-grid">
          <Chart data={metrics.horasPorEntidad} />
          <BarChartComponent
            data={metrics.horasPorActividad}
            title="Horas por Actividad"
            dataKey="actividad"
            valueKey="horas"
            color="#667eea"
          />
        </div>
      </div>
    </div>
  );
}
