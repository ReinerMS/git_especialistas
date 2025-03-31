import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Award } from "lucide-react";

const Card = ({
  imageUrl,
  id,
  userName,
  userCovergeArea,
  imageCertificado,
  userWorkArea,
  especializacion,
}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className="bg-white rounded-lg shadow-md mt-36 hover:scale-105 transition relative">
        {/* Imagen de usuario */}
        <img
          src={imageUrl}
          alt={userName}
          className="object-cover rounded-full h-36 w-36 mx-auto absolute top-[-130px] left-1/2 transform -translate-x-1/2"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "./imgs/noimg.jpg";
          }}
        />
        {/* Contenido */}
        <div className="bg-gray-50 p-3 rounded-b-lg mt-16">
          <h2 className="text-lg font-bold mt-2 text-blue-900 text-center">
            {userName}
          </h2>

          <div className="mt-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>Área de cobertura:</span>
            </div>
            <div className="ml-6 font-bold text-blue-900">
              {userCovergeArea}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Briefcase size={16} />
              <span>Áreas de trabajo:</span>
            </div>
            <div className="ml-6 font-bold text-blue-900">
              {userWorkArea && userWorkArea.join(", ")}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Award size={16} />
              <span>Especialización:</span>
            </div>
            <div className="ml-6 font-bold text-blue-900">
              {especializacion && especializacion.join(", ")}
            </div>
          </div>

          {/* Certificaciones */}
          <div className="mt-2">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <Award size={16} />
              <span>Certificaciones</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {imageCertificado && imageCertificado.length > 0 ? (
                imageCertificado.map((certId, index) => (
                  <img
                    key={index}
                    src={`./certificados/${certId}.png`}
                    alt={`Certificado ${certId}`}
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "./imgs/noimg.jpg";
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  Sin certificaciones disponibles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userName: PropTypes.string.isRequired,
  userCovergeArea: PropTypes.string.isRequired,
  userWorkArea: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageCertificado: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  especializacion: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
