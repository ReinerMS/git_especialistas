import { Link } from "react-router-dom";
const Footer = () => {



    return (
      <div className=" text-white">
      <div className="bg-azul-colono flex flex-col md:flex-row md:justify-around items-center space-y-6 md:space-y-0 p-4">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <img
            className="h-12 m-3 rounded"
            src="/imgs/logoBlanco.png"
            alt="Logo"
          />
          <p className="text-sm">
            <strong>Pendiente</strong>
          </p>
        </div>

        {/* Lista */}
        <div className="text-center md:text-Center">
          <h2 className="text-lg font-bold mb-2">Navegación</h2>
          
          <ul className="space-y-2">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <a
              target="_blank"
                href="https://wa.me/+50689198573"
                className="font-s hover:underline text-white"
              >
                {" "}WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales e Información de Contacto */}
        <div className="text-center md:text-center">
          <h2 className="text-lg font-bold mb-2">Contacto</h2>
          <p className="text-sm">Correo: Pendiente</p>
          <p className="text-sm">Tel: Pendiente</p>
          <div className="flex flex-wrap justify-center space-x-4 ">
            <a
              target="_blank"
              href="https://www.facebook.com/ganaderia.colonorealCR/"
              className="hover:text-gray-300"
            >
              Facebook
            </a>
            <a
              target="_blank"
              href="#"
              className="hover:text-gray-300"
            >
              Instagram / pendiente
            </a>
          </div>
        </div>
      </div>
      <div className="bg-azul-colono">
        <p className="text-sm text-center">
          <strong>© 2025</strong>, Colono Construcción
        </p>
      </div>
    </div>
    );
  };
  
  export default Footer;
  