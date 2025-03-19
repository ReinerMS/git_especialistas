import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users"
import Disclamer from "../components/Disclamer";
import { Phone, Mail, ArrowLeft, MapPin, Award, Briefcase, Building, User, Phone as PhoneIcon, MailIcon } from "lucide-react";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Obtenemos los filtros del state o del sessionStorage
  const locationFilters = location.state?.filters;
  const sessionFilters = sessionStorage.getItem("filters")
    ? JSON.parse(sessionStorage.getItem("filters"))
    : null;
  const filters = locationFilters || sessionFilters;

  useEffect(() => {
    const users = GetUsers();
    const fetchedUser = users.find((user) => String(user.id) === String(id));
    setUser(fetchedUser);
  }, [id]);

  // Función para regresar usando los filtros guardados
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBack = () => {
    if (filters && filters.provincia && filters.canton && filters.area) {
      navigate(
        `/resultados?provincia=${filters.provincia}&canton=${filters.canton}&area=${filters.area}`
      );
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    // Agregamos una entrada extra en el historial para interceptar el retroceso
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      handleBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [filters, handleBack]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <p className="text-xl text-gray-600">No se encontró al especialista o usuario.</p>
          <button 
            onClick={handleBack}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = `/imgsUsers/${user.id}.jpg`;
 

  // Función para manejar el click en WhatsApp
  const handleWhatsAppClick = () => {
    if (user.telefono) {
      // Formatear número de teléfono (eliminar espacios y caracteres especiales)
      const formattedPhone = user.telefono.replace(/\D/g, '');
      window.open(`https://wa.me/506${formattedPhone}`, '_blank');
    }
  };

  // Función para manejar el click en Email
  const handleEmailClick = () => {
    if (user.email) {
      window.open(`mailto:${user.email}`, '_blank');
    } else {
      alert("No hay correo electrónico disponible para este especialista.");
    }
  };

  // Función para manejar el click en Llamar
  const handleCallClick = () => {
    if (user.telefono) {
      window.open(`tel:${user.telefono}`, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Botón de regreso */}
        <button 
          onClick={handleBack} 
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header con nombre y área */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6">
            <h1 className="text-2xl lg:text-4xl font-bold">
              {user.nombre} {user.apellido} {user.apellido2}
            </h1>
            <div className="flex items-center mt-2">
              <Briefcase size={18} className="mr-2" />
              <span>{user.areaTrabajo}</span>
            </div>
          </div>

          <div className="lg:flex jus flex-wrap p-6">
            {/* Columna de información personal */}
            <div className="flex-1 lg:pr-8">
              <div className="flex justify-center lg:justify-center mb-6">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={user.nombre}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/imgs/noimg.jpg";
                    }}
                    className="object-cover h-64 w-64 rounded-lg shadow-md border-4 border-white"
                  />
                  
                </div>
              </div>

              {/* Certificaciones */}
              <div className="bg-slate-50 rounded-lg p-4 shadow-sm mt-6">
                <div className="flex justify-center mb-4">
                  <Award size={20} className="mr-2 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-800">Certificaciones</h3>
                </div>
                {user.certificado?.length > 0 ? (
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-center">
                    {user.certificado.map((cert) => (
                      <div key={cert} className="text-center">
                        <img
                          src={`/certificado/${cert}.png`}
                          alt={`Certificado ${cert}`}
                          className="h-16 w-16 lg:h-20 lg:w-20 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/imgs/noimg.jpg";
                          }}
                        />
                        
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-center">No hay certificaciones disponibles.</p>
                )}
              </div>
            </div>

            {/* Columna de información y contacto */}
            <div className="flex-1 mt-6 lg:mt-0">
              <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <User size={20} className="mr-2 text-blue-600" />
                  Información del especialista
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Briefcase size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Áreas de trabajo</p>
                      <p className="font-medium">{user.areaTrabajo}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Building size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Punto de venta asociado</p>
                      <p className="font-medium">{user.puntoVenta}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Ubicación</p>
                      <p className="font-medium">{user.provincia}, {user.canton}, {user.distrito}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Área de cobertura</p>
                      <p className="font-medium">{user.areaCovertura}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <PhoneIcon size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium">{user.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MailIcon size={18} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Correo</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de contacto */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex flex-col items-center justify-center bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span className="mt-2">WhatsApp</span>
                </button>

                <button
                  onClick={handleEmailClick}
                  className="flex flex-col items-center justify-center bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                  <Mail size={24} />
                  <span className="mt-2">Correo</span>
                </button>

                <button
                  onClick={handleCallClick}
                  className="flex flex-col items-center justify-center bg-purple-500 text-white p-4 rounded-lg shadow hover:bg-purple-600 transition-colors"
                >
                  <Phone size={24} />
                  <span className="mt-2">Llamar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sección de calificaciones - Comentada pero mejorada por si deseas activarla */}
          {/*
          <section className="bg-slate-50 p-6 m-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <Star size={20} className="mr-2 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Calificaciones</h2>
            </div>
            {promedio !== null ? (
              <div className="mt-2 space-y-3">
                {estrellas.map((est) => (
                  <div
                    key={est.id}
                    className="p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < est.calificacion ? "#FFD700" : "#E5E7EB"}
                            stroke={i < est.calificacion ? "#FFD700" : "#E5E7EB"}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-gray-700 font-medium">
                        {est.calificacion} estrellas
                      </p>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {est.comentario}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-gray-500 italic">No hay calificaciones disponibles.</p>
            )}
          </section>
          */}

          {/* Disclaimer */}
          <div className="px-6 pb-6">
            <Disclamer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;