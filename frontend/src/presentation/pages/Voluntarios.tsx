import { useVoluntariosData } from '../../application/useVoluntariosData';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import './Voluntarios.css';

export function Voluntarios() {
  const { voluntarios, loading, error } = useVoluntariosData();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Voluntarios</h1>
        <p className="page-subtitle">
          Listado completo de voluntarios ({voluntarios.length})
        </p>
      </header>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Entidad</th>
              <th>Rol</th>
              <th>Fecha Alta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {voluntarios.map((voluntario) => (
              <tr key={voluntario.id}>
                <td className="font-semibold">{voluntario.nombre}</td>
                <td>{voluntario.entidad}</td>
                <td>{voluntario.rol}</td>
                <td>{new Date(voluntario.alta).toLocaleDateString('es-ES')}</td>
                <td>
                  <span className={`status-badge ${voluntario.activo ? 'active' : 'inactive'}`}>
                    {voluntario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
