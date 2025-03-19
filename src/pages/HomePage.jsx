import BannerHome from "../components/BannerHome";
import BannerHome2 from "../components/BannerHome2";

const HomePage = () => {
  return (
    <>
    
      <BannerHome />
      <BannerHome2 />
      
      <div className="m-5">
        <p className=" bg-azul-colono text-sm p-5 text-justify rounded-2xl text-white ">
          El Directorio de Especialistas es una herramienta diseñada para facilitar la búsqueda de constructores y profesionales que puedan ayudarle a ampliar, remodelar o equipar su hogar o proyecto. Los especialistas que aparecen en este directorio han sido seleccionados por Colono Construcción en base a su experiencia, calidad de trabajo y reputación en el mercado.
        </p>
      </div>

    </>
  );
};

export default HomePage;
