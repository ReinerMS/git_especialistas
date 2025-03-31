import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Search } from "lucide-react";

export default function FiltroEspecialistas() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Cómo encontrar al especialista adecuado?
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Por favor, seleccione un método de búsqueda para encontrar al especialista ideal para su proyecto.
          </p>
        </div>

        {/* Tarjetas de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta de Provincia */}
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/filtro/provincia")}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Filtro por ubicación
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Encuentre a los especialistas de acuerdo a su ubicación geográfica.
              </p>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() => navigate("/filtro/provincia")}
              >
                <Search size={16} className="mr-2" />
                Buscar por ubicación
              </button>
            </div>
          </div>

          {/* Tarjeta de Área de Trabajo */}
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/filtro/area-trabajo")}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Filtro por área profesional
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Encuentre a los especialistas según su especialidad o área profesional.
              </p>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() => navigate("/filtro/area-trabajo")}
              >
                <Search size={16} className="mr-2" />
                Buscar por especialidad
              </button>
            </div>
          </div>
        </div>

        {/* Texto informativo */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Nuestros especialistas están certificados y listos para ayudarle en su proyecto.
          </p>
        </div>
      </div>
    </div>
  );
}
