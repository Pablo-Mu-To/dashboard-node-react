import { useTurnos } from '../../application/useTurnos';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import './Turnos.css';

export function Turnos() {
  const { turnos, loading, error } = useTurnos();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Turnos</h1>
        <p className="page-subtitle">
          Listado completo de turnos ({turnos.length})
        </p>
      </header>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Voluntario</th>
              <th>Entidad</th>
              <th>Actividad</th>
              <th>Horas</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.id}>
                <td className="font-semibold">
                  {new Date(turno.fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td>{turno.voluntarioId}</td>
                <td>{turno.entidad}</td>
                <td>
                  <span className="activity-badge">{turno.actividad}</span>
                </td>
                <td>
                  <span className="hours-badge">{turno.horas}h</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
