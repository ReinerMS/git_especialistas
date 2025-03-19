import { useState } from "react";
import { GetUsers } from "../services/Users";
import { GetProvincia } from "../services/Provincias";
import { GetArea } from "../services/AreasTrabajo";

// Datos de usuarios
const data = GetUsers() || [];
const provincias = GetProvincia() || [];
const areasTrabajo = GetArea() || [];

export default function ProvinceFilter() {
  const [filterType, setFilterType] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCanton, setSelectedCanton] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  // Obtener la provincia seleccionada con sus cantones
  const selectedProvinceData = provincias.find(p => p.provincia === selectedProvince) || {};
  const filteredCantones = selectedProvinceData.cantones || [];

  console.log("Provincia seleccionada:", selectedProvince);
  console.log("Cantón seleccionado:", selectedCanton);
  console.log("Área seleccionada:", selectedArea);
  console.log("Datos de usuarios:", data);

  // Filtrar datos según el tipo de filtro
  const filterdata =
    filterType === "areaTrabajo"
      ? data.filter((user) => user.areaTrabajo === selectedArea)
      : data.filter(
          (user) =>
            user.provincia === selectedProvince &&
            (!selectedCanton || user.canton === selectedCanton) &&
            (!selectedArea || user.areaTrabajo === selectedArea)
        );

  console.log(filterdata);

  const handleBack = () => {
    if (selectedArea) {
      setSelectedArea(null);
    } else if (selectedCanton) {
      setSelectedCanton(null);
    } else if (selectedProvince) {
      setSelectedProvince(null);
    } else {
      setFilterType(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Botón de regreso */}
      {filterType && (
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Regresar
          </button>
        </div>
      )}

      {/* Mostrar "Ver por" solo cuando no se ha seleccionado ningún filtro */}
      {!filterType && (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Ver por</h1>
          <div className="flex justify-center mt-2 space-x-4">
            <button
              className={`px-6 py-2 rounded-md ${filterType === "provincia" ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}
              onClick={() => setFilterType("provincia")}
            >
              Provincias
            </button>
            <button
              className={`px-6 py-2 rounded-md ${filterType === "areaTrabajo" ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}
              onClick={() => setFilterType("areaTrabajo")}
            >
              Área de Trabajo
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {!filterType ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-600">Selecciona una opción para iniciar el filtro.</p>
        </div>
      ) : selectedArea ? (
        // Muestra los resultados y oculta la sección "Ver por"
        <div>
          <h2 className="text-xl font-bold mb-4">
            Resultados en {selectedProvince || "todas las provincias"}, {selectedCanton || "todos los cantones"} para {selectedArea}:
          </h2>
          {filterdata.length > 0 ? (
            <ul className="space-y-3">
              {filterdata.map((user) => (
                <li key={user.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-bold">
                    {user.provincia} - {user.canton} {user.apellido}
                  </div>
                  <div className="text-gray-600">{user.especializacion}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 bg-gray-100 rounded-lg">No hay resultados disponibles.</p>
          )}
        </div>
      ) : filterType === "provincia" ? (
        !selectedProvince ? (
          // Tarjetas de Provincias
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {provincias.map((prov) => (
              <button
                key={prov.provincia}
                onClick={() => setSelectedProvince(prov.provincia)}
                className="hover:scale-105 transition-all bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
              >
                <div className="h-40 relative">
                  <img
                    src={prov.imagen}
                    alt={prov.provincia}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full bg-blue-600 text-white p-2 text-center hover:bg-blue-700 transition-colors">
                  {prov.provincia}
                </div>
              </button>
            ))}
          </div>
        ) : !selectedCanton ? (
          // Selección de Cantón dentro de la Provincia
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredCantones.map((canton, index) => (
              <button
                key={`${canton.canton}-${index}`}
                onClick={() => setSelectedCanton(canton.canton)}
                className="bg-gray-300 text-black p-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {canton.canton}
              </button>
            ))}
          </div>
        ) : (
          // Selección de Área de Trabajo (dentro del flujo de provincia)
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {areasTrabajo.map((area, index) => (
              <button
                key={`${area.area}-${index}`}
                onClick={() => setSelectedArea(area.area)}
                className="hover:scale-105 transition-all bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
              >
                <div className="h-40 relative">
                  <img
                    src={area.imagen || "/default.jpg"}
                    alt={area.area}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full bg-blue-600 text-white p-2 text-center hover:bg-blue-700 transition-colors">
                  {area.area}
                </div>
              </button>
            ))}
          </div>
        )
      ) : (
        // Tarjetas de Áreas de Trabajo (flujo directo)
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {areasTrabajo.map((area, index) => (
            <button
              key={`${area.area}-${index}`}
              onClick={() => setSelectedArea(area.area)}
              className="hover:scale-105 transition-all bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
            >
              <div className="h-40 relative">
                <img
                  src={area.imagen || "/default.jpg"}
                  alt={area.area}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full bg-blue-600 text-white p-2 text-center hover:bg-blue-700 transition-colors">
                {area.area}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
