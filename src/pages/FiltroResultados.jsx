import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { GetUsers } from "../services/Users";
import Card from "../components/Card";
import { Calificacion } from "../services/Calificacion";
import { ArrowLeft, Search, MapPin, Briefcase, AlertTriangle } from "lucide-react";

export default function FiltroResultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const provincia = queryParams.get("provincia");
  const canton = queryParams.get("canton");
  const area = queryParams.get("area");
  const especializacion = queryParams.get("especializacion");
  
  // Obtener usuarios y calificaciones
  const data = GetUsers() || [];
  const ratingsData = Calificacion();
  const placeholderImage = "./imgs/noimg.jpg";

  // Filtrar los datos según los parámetros de la URL.
  // Si se recibe un filtro de especialización, se agrega a la comparación
  const filterData = data.filter((user) => {
    const matchProvincia = user.provincia === provincia;
    const matchCanton = user.canton === canton;
    const matchArea = user.areaTrabajo.includes(area);
    const matchEspecializacion =
      !especializacion ||
      (user.especializacion &&
        String(user.especializacion).toLowerCase().includes(especializacion.toLowerCase()));
    return matchProvincia && matchCanton && matchArea && matchEspecializacion;
  });

  // Redirigir a la página principal si no se reciben parámetros válidos (provincia, cantón y área son obligatorios)
  useEffect(() => {
    if (!provincia || !canton || !area) {
      navigate("/");
    }
  }, [provincia, canton, area, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-6">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Encabezado con información de búsqueda */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Resultados de su búsqueda
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
                {especializacion && (
                  <>
                    <div className="hidden md:block text-gray-400">•</div>
                    <div className="flex items-center">
                      <Search size={16} className="mr-1 text-blue-600" />
                      <p>{especializacion}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/Especialistas"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Regresar a la búsqueda
              </Link>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Search size={20} className="mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Se han encontrado {filterData.length} especialista{filterData.length !== 1 && "s"}
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
                // Almacenar los filtros en sessionStorage para pasarlos al detalle
                const filters = { provincia, canton, area, especializacion };
                return (
                  <div
                    key={item.id}
                    onClick={() => {
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
                No se han encontrado resultados
              </h3>
              <p className="text-gray-600 mb-4">
                No se encuentran especialistas disponibles que cumplan con los criterios de búsqueda.
              </p>
              <Link
                to="/Especialistas"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Realice una nueva búsqueda
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
