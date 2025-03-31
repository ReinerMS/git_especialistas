import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users";
import { GetProvincia } from "../services/Provincias";
import { GetArea } from "../services/AreasTrabajo";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronLeft } from "lucide-react";

export default function AreaTrabajoFilterPage() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCanton, setSelectedCanton] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [users, setUsers] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [areasTrabajo, setAreasTrabajo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await GetUsers();
        const provinciasData = await GetProvincia();
        const areasData = await GetArea();

        setUsers(usersData || []);
        setProvincias(provinciasData || []);
        setAreasTrabajo(areasData || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrar provincias que tengan usuarios asociados al área de trabajo seleccionada
  const filteredProvincias = provincias.filter((prov) =>
    users.some(
      (user) =>
        user.provincia === prov.provincia &&
        user.areaTrabajo.includes(selectedArea)
    )
  );

  // Para la provincia seleccionada, filtrar sus cantones que tengan usuarios para el área elegida
  const selectedProvinceData =
    provincias.find((p) => p.provincia === selectedProvince) || { cantones: [] };
  const filteredCantones = selectedProvinceData.cantones.filter((canton) =>
    users.some(
      (user) =>
        user.provincia === selectedProvince &&
        user.canton === canton.canton &&
        user.areaTrabajo.includes(selectedArea)
    )
  );

  const goBack = () => {
    if (selectedSpecialization) {
      setSelectedSpecialization(null);
    } else if (selectedCanton) {
      setSelectedCanton(null);
    } else if (selectedProvince) {
      setSelectedProvince(null);
    } else if (selectedArea) {
      setSelectedArea(null);
    } else {
      navigate("/especialistas");
    }
  };

  const getStepTitle = () => {
    if (!selectedArea) {
      return "Seleccione un área de trabajo";
    } else if (!selectedProvince) {
      return `Seleccione una provincia para el área de ${selectedArea}`;
    } else if (!selectedCanton) {
      return `Seleccione un cantón en ${selectedProvince}`;
    } else if (!selectedSpecialization) {
      return `Seleccione una especialización en ${selectedCanton}`;
    } else {
      return "Resultados";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center py-10">
      <div className="w-full px-2 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <button
            onClick={goBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4 mx-auto"
          >
            <ChevronLeft size={20} className="mr-1" />
            Regresar
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {getStepTitle()}
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            {!selectedArea
              ? "Encuentre especialistas de acuerdo con el área de trabajo que requiera."
              : !selectedProvince
              ? "Seleccione la provincia en la que usted desea encontrar especialistas para el área elegida."
              : !selectedCanton
              ? "Seleccione el cantón dentro de la provincia seleccionada, donde usted desee buscar especialistas."
              : "Elija la especialización que usted requiera."}
          </p>
        </div>

        {/* Contenido principal - Selección por pasos */}
        {!selectedArea ? (
          // Tarjetas de áreas de trabajo
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {areasTrabajo
              .filter((area) =>
                users.some((user) => user.areaTrabajo.includes(area.area))
              )
              .map((area, index) => {
                const count = users.filter((user) =>
                  user.areaTrabajo.includes(area.area)
                ).length;
                return (
                  <div
                    key={`${area.area}-${index}`}
                    onClick={() => setSelectedArea(area.area)}
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
                      <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                        Seleccionar área
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : !selectedProvince ? (
          // Tarjetas de provincias filtradas por el área seleccionada
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredProvincias.map((prov) => {
              const count = users.filter(
                (user) =>
                  user.provincia === prov.provincia &&
                  user.areaTrabajo.includes(selectedArea)
              ).length;
              return (
                <div
                  key={prov.provincia}
                  onClick={() => setSelectedProvince(prov.provincia)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-105"
                >
                  <div className="h-40 relative">
                    <img
                      src={prov.imagen}
                      alt={prov.provincia}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full bg-blue-600 text-white p-3 text-center hover:bg-blue-700 transition-colors flex flex-col items-center">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {prov.provincia}
                    </div>
                    <span className="text-sm mt-1">
                      {count} especialista{count !== 1 && "s"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !selectedCanton ? (
          // Tarjetas de cantones filtradas por el área y provincia seleccionadas
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCantones.map((canton, index) => {
              const count = users.filter(
                (user) =>
                  user.provincia === selectedProvince &&
                  user.canton === canton.canton &&
                  user.areaTrabajo.includes(selectedArea)
              ).length;
              return (
                <div
                  key={`${canton.canton}-${index}`}
                  onClick={() => setSelectedCanton(canton.canton)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                      {canton.canton}
                    </h2>
                    <div className="text-center text-sm text-gray-600 mb-4">
                      {count} especialista{count !== 1 && "s"}
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                      Seleccionar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !selectedSpecialization ? (
          // Tarjetas de especialización eliminando duplicados
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(() => {
              // Filtrar usuarios según el área, provincia y cantón seleccionados
              const filteredUsers = users.filter(
                (user) =>
                  user.areaTrabajo.includes(selectedArea) &&
                  user.provincia === selectedProvince &&
                  user.canton === selectedCanton
              );
              // Eliminar duplicados de especializaciones
              const uniqueSpecializationsMap = new Map();
              filteredUsers.forEach((user) => {
                const normalized = String(user.especializacion)
                  .trim()
                  .toLowerCase();
                if (!uniqueSpecializationsMap.has(normalized)) {
                  uniqueSpecializationsMap.set(
                    normalized,
                    String(user.especializacion).trim()
                  );
                }
              });
              const especializaciones = Array.from(
                uniqueSpecializationsMap.entries()
              ).map(([normalized, original]) => ({
                normalized,
                original,
              }));

              return especializaciones.map((esp, index) => {
                const count = filteredUsers.filter(
                  (user) =>
                    String(user.especializacion).trim().toLowerCase() ===
                    esp.normalized
                ).length;
                return (
                  <div
                    key={`${esp.normalized}-${index}`}
                    onClick={() => {
                      setSelectedSpecialization(esp.original);
                      navigate(
                        `/resultados?provincia=${selectedProvince}&canton=${selectedCanton}&area=${selectedArea}&especializacion=${esp.original}`
                      );
                    }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-105"
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                        {esp.original}
                      </h2>
                      <div className="text-center text-sm text-gray-600 mb-4">
                        {count} especialista{count !== 1 && "s"}
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                        Seleccionar
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        ) : null}

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
