import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users";
import { GetProvincia } from "../services/Provincias";
import { GetArea } from "../services/AreasTrabajo";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronLeft, Search } from "lucide-react";

export default function ProvinceFilterPage() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCanton, setSelectedCanton] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
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

  // Obtener datos de la provincia seleccionada y sus cantones
  const selectedProvinceData =
    provincias.find((p) => p.provincia === selectedProvince) || { cantones: [] };
  const filteredCantones = selectedProvinceData.cantones;

  const goBack = () => {
    if (selectedSpecialization) {
      setSelectedSpecialization(null);
    } else if (selectedArea) {
      setSelectedArea(null);
    } else if (selectedCanton) {
      setSelectedCanton(null);
    } else if (selectedProvince) {
      setSelectedProvince(null);
    } else {
      navigate("/especialistas");
    }
  };

  const getStepTitle = () => {
    if (!selectedProvince) {
      return "Seleccione una provincia";
    } else if (!selectedCanton) {
      return `Seleccione un cantón en ${selectedProvince}`;
    } else if (!selectedArea) {
      return `Seleccione un área de trabajo en ${selectedCanton}`;
    } else if (!selectedSpecialization) {
      return `Seleccione una especialización en ${selectedArea}`;
    } else {
      return "Resultados";
    }
  };

  // Función para renderizar las tarjetas de especialización sin duplicados
  const renderSpecializations = () => {
    // Filtrar usuarios según provincia, cantón y área seleccionados
    const filteredUsers = users.filter(
      (user) =>
        user.provincia === selectedProvince &&
        user.canton === selectedCanton &&
        user.areaTrabajo.includes(selectedArea)
    );
    // Homologar especializaciones eliminando duplicados
    const uniqueSpecializationsMap = new Map();
    filteredUsers.forEach((user) => {
      const normalized = String(user.especializacion).trim().toLowerCase();
      if (!uniqueSpecializationsMap.has(normalized)) {
        uniqueSpecializationsMap.set(normalized, String(user.especializacion).trim());
      }
    });
    const especializaciones = Array.from(uniqueSpecializationsMap.entries()).map(
      ([normalized, original]) => ({
        normalized,
        original,
      })
    );

    return especializaciones.map((esp, index) => {
      const count = filteredUsers.filter(
        (user) =>
          String(user.especializacion).trim().toLowerCase() === esp.normalized
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
            Volver
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {getStepTitle()}
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            {!selectedProvince
              ? "Encuentre especialistas según su ubicación geográfica."
              : !selectedCanton
              ? "Seleccione el cantón donde desea encontrar especialistas."
              : !selectedArea
              ? "Seleccione el área de especialidad que necesita."
              : "Elija la especialización que requiere."}
          </p>
        </div>

        {/* Contenido principal - Selección por pasos */}
        {!selectedProvince ? (
          // Tarjetas de provincias
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {provincias
              .filter(
                (prov) =>
                  users.filter((user) => user.provincia === prov.provincia).length >= 1
              )
              .map((prov) => {
                const count = users.filter(
                  (user) => user.provincia === prov.provincia
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
          // Tarjetas de cantones
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCantones
              .filter((canton) =>
                users.filter(
                  (user) =>
                    user.provincia === selectedProvince &&
                    user.canton === canton.canton
                ).length >= 1
              )
              .map((canton, index) => {
                const count = users.filter(
                  (user) =>
                    user.provincia === selectedProvince &&
                    user.canton === canton.canton
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
                        <Search size={16} className="mr-2" />
                        Seleccionar
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : !selectedArea ? (
          // Tarjetas de áreas de trabajo
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {areasTrabajo
              .filter((area) =>
                users.filter(
                  (user) =>
                    user.provincia === selectedProvince &&
                    user.canton === selectedCanton &&
                    user.areaTrabajo.includes(area.area)
                ).length >= 1
              )
              .map((area, index) => {
                const count = users.filter(
                  (user) =>
                    user.provincia === selectedProvince &&
                    user.canton === selectedCanton &&
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
        ) : !selectedSpecialization ? (
          // Tarjetas de especialización
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {renderSpecializations()}
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
