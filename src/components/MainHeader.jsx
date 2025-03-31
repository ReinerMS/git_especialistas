import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <div>
      <header className="fixed top-0 left-0 w-full h-20 px-2 bg-white shadow-md flex items-center z-50">
        <nav className="w-full flex justify-around items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"}>
            {/* Logo normal para pantallas grandes */}
            <img src="./imgs/logoAzul.png" alt="Logo" className="hidden lg:block h-16" />
              {/* Favicon para pantallas móviles */}
              <img
                src="./imgs/faviconb.png"
                alt="Favicon"
                className="block lg:hidden h-10"
              />
              </Link>
          </div>
          
          {/* Menú de hamburguesa */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-azul-colono hover:text-blue-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Enlaces de navegación */}
          <a
            className={`flex items-center space-x-5 ${isMenuOpen
              ? "hidden"
              : "hidden"} lg:flex`}
          >
            <Link to={"/"} className="text-lg font-medium text-azul-colono hover:text-blue-900 transition duration-300">Inicio</Link>
            <Link to={"/especialistas"} className="text-lg font-medium text-azul-colono hover:text-blue-900 transition duration-300">Especialistas</Link>
          </a>
        </nav>

        {/* Modal para el menú en pantallas pequeñas */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex justify-center items-center bg-white rounded-lg p-3 h-2/4 w-2/3 max-w-sm">
              <div className="flex flex-col items-center space-y-4 ">
                <Link to={"/"} className="text-lg font-medium text-blue-600 hover:text-blue-900 transition duration-300" onClick={closeMenu}>Inicio</Link>
                <Link to={"/especialistas"} className="text-lg font-medium text-blue-600 hover:text-blue-900 transition duration-300" onClick={closeMenu}>Especialistas</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      </div>
    </>
  );
};

export default Header;
