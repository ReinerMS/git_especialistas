import { useState } from "react";
import { GetUsers } from "../services/Users";
import { GetArea } from "../services/AreasTrabajo";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Datos
const data = GetUsers() || [];
const areasTrabajo = GetArea() || [];

export default function AreaTrabajoFilterPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const navigate = useNavigate();

  // Extraer las especializaciones únicas para el área seleccionada
  const especialidades = selectedArea
    ? Array.from(
        new Set(
          data
            .filter((user) => user.areaTrabajo === selectedArea)
            .map((user) => user.especializacion)
        )
      )
    : [];

  // Filtrado de datos considerando si se seleccionó especialidad
  const filterData = data.filter(
    (user) =>
      user.areaTrabajo === selectedArea &&
      (selectedEspecialidad ? user.especializacion === selectedEspecialidad : true)
  );

  // Manejar el botón de regresar: primero quita la especialidad (si existe), luego el área, y al final navega
  const handleBack = () => {
    if (selectedEspecialidad) {
      setSelectedEspecialidad(null);
    } else if (selectedArea) {
      setSelectedArea(null);
    } else {
      navigate("/especialistas");
    }
  };

  // Función para manejar la selección de un área
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSelectedEspecialidad(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4 mx-auto"
          >
            <ChevronLeft size={20} className="mr-1" />
            Regresar
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {!selectedArea
              ? "Selecciona un área de trabajo"
              : selectedEspecialidad
              ? `Resultados para ${selectedArea} - ${selectedEspecialidad}`
              : `Selecciona una especialidad para ${selectedArea}`}
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            {!selectedArea
              ? "Elige el área de especialidad que buscas."
              : !selectedEspecialidad && especialidades.length > 0
              ? "Elige la especialidad que buscas."
              : "Encuentra a los especialistas correspondientes."}
          </p>
        </div>

        {/* Contenido principal */}
        {!selectedArea ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {areasTrabajo
              .filter((area) => data.filter((user) => user.areaTrabajo === area.area).length >= 1)
              .map((area, index) => {
                // Contar la cantidad de especialistas para cada área
                const count = data.filter((user) => user.areaTrabajo === area.area).length;
                return (
                  <div
                    key={`${area.area}-${index}`}
                    onClick={() => handleAreaSelect(area.area)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-105"
                  >
                    <div className="h-40 relative">
                      <img
                        src={area.imagen || "/default.jpg"}
                        alt={area.area}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-sm lg:text-xl font-semibold text-center text-gray-800 mb-2">
                        {area.area}
                      </h2>
                      <div className="text-center text-sm text-gray-600 mb-4">
                        {count} especialista{count !== 1 && "s"}
                      </div>
                      <button 
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        Seleccionar especialistas
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <>
            {/* Filtro secundario para especialidad si existen opciones */}
            {!selectedEspecialidad && especialidades.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {especialidades
                  .filter((esp) =>
                    data.filter(
                      (user) =>
                        user.areaTrabajo === selectedArea && user.especializacion === esp
                    ).length >= 1
                  )
                  .map((esp, index) => {
                    // Contar la cantidad de especialistas para la especialidad
                    const count = data.filter(
                      (user) =>
                        user.areaTrabajo === selectedArea && user.especializacion === esp
                    ).length;
                    return (
                      <div
                        key={`${esp}-${index}`}
                        onClick={() => setSelectedEspecialidad(esp)}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-105"
                      >
                        <div className="h-40 flex flex-col items-center justify-center">
                          {/* Aquí puedes agregar una imagen o ícono relacionado a la especialidad */}
                          <span className="text-xl font-bold text-gray-800">{esp}</span>
                        </div>
                        <div className="p-4">
                          <div className="text-center text-sm text-gray-600 mb-4">
                            {count} especialista{count !== 1 && "s"}
                          </div>
                          <button 
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                          >
                            Seleccionar
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              // Mostrar resultados (filtrados por área y, si aplica, por especialidad)
              <div className="mt-6">
                {filterData.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {filterData.map((user) => (
                      <div
                        key={user.id}
                        className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="font-bold text-gray-800">
                          {user.provincia} - {user.canton} {user.apellido}
                        </div>
                        <div className="text-gray-600">{user.especializacion}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 bg-gray-100 rounded-lg text-center">
                    No hay resultados disponibles.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Texto informativo */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Nuestros especialistas están certificados y listos para ayudarte en tu proyecto.
          </p>
        </div>
      </div>
    </div>
  );
}
