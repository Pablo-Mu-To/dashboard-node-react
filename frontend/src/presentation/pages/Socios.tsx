import { useVoluntariosData } from '../../application/useVoluntariosData';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import './Socios.css';

export function Socios() {
  const { voluntarios, loading, error } = useVoluntariosData();

  // Filtrar solo voluntarios activos (considerados como socios)
  const socios = voluntarios.filter((v) => v.activo);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Socios</h1>
        <p className="page-subtitle">
          Listado de socios activos ({socios.length})
        </p>
      </header>

      <div className="cards-grid">
        {socios.map((socio) => (
          <div key={socio.id} className="socio-card">
            <div className="socio-card-header">
              <div className="socio-avatar">
                {socio.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="socio-info">
                <h3 className="socio-name">{socio.nombre}</h3>
                <p className="socio-role">{socio.rol}</p>
              </div>
            </div>
            <div className="socio-card-body">
              <div className="socio-detail">
                <span className="detail-label">Entidad:</span>
                <span className="detail-value">{socio.entidad}</span>
              </div>
              <div className="socio-detail">
                <span className="detail-label">Fecha Alta:</span>
                <span className="detail-value">
                  {new Date(socio.alta).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
