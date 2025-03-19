import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetUsers } from "../services/Users";
import Card from "../components/Card";
import { Calificacion } from "../services/Calificacion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Briefcase, AlertTriangle } from "lucide-react";

export default function FiltroResultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const provincia = queryParams.get("provincia");
  const canton = queryParams.get("canton");
  const area = queryParams.get("area");

  // Obtener usuarios y calificaciones
  const data = GetUsers() || [];
  const ratingsData = Calificacion();
  const placeholderImage = "./imgs/noimg.jpg";

  // Filtrar los datos según los parámetros de la URL usando includes para areaTrabajo
  const filterData = data.filter(
    (user) =>
      user.provincia === provincia &&
      user.canton === canton &&
      user.areaTrabajo.includes(area)
  );

  // Redirigir a la página principal si no se reciben parámetros válidos
  useEffect(() => {
    if (!provincia || !canton || !area) {
      navigate("/");
    }
  }, [provincia, canton, area, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-6">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Header con información de búsqueda */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Resultados de búsqueda
              </h1>
              <div className="flex flex-col md:flex-row md:items-center text-gray-600 gap-2 md:gap-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-blue-600" />
                  <span>
                    {provincia}, {canton}
                  </span>
                </div>
                <div className="hidden md:block text-gray-400">•</div>
                <div className="flex items-center">
                  <Briefcase size={16} className="mr-1 text-blue-600" />
                  <span>{area}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/Especialistas"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Volver a búsqueda
              </Link>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Search size={20} className="mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Se encontraron {filterData.length} especialistas
            </h2>
          </div>

          {filterData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filterData.map((item) => {
                // Buscar el registro de calificación para el especialista.
                const ratingRecord = ratingsData.calificacion.find(
                  (r) => String(r.id) === String(item.id)
                );
                let averageRating = null;
                if (
                  ratingRecord &&
                  ratingRecord.estrellas &&
                  ratingRecord.estrellas.length > 0
                ) {
                  averageRating =
                    ratingRecord.estrellas.reduce(
                      (sum, rating) => sum + rating.calificacion,
                      0
                    ) / ratingRecord.estrellas.length;
                }
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      const filters = { provincia, canton, area };
                      sessionStorage.setItem("filters", JSON.stringify(filters));
                      navigate(`/detalle/${item.id}`, { state: { filters } });
                    }}
                    className="cursor-pointer transform transition-transform hover:scale-105"
                  >
                    <Card
                      userId={item.id}
                      id={item.id}
                      userName={`${item.nombre} ${item.apellido}`}
                      userCovergeArea={item.areaCovertura}
                      userWorkArea={item.areaTrabajo}
                      imageUrl={`./imgsUsers/${item.id}.jpg`}
                      // Se usa "certificados" en lugar de "certificado"
                      imageCertificado={item.certificados || []}
                      especializacion={item.especializacion || []}
                      placeholderImage={placeholderImage}
                      averageRating={averageRating}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
              <AlertTriangle size={48} className="text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 mb-4">
                No hay especialistas disponibles que coincidan con los criterios de búsqueda.
              </p>
              <Link
                to="/Especialistas"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Realizar nueva búsqueda
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
