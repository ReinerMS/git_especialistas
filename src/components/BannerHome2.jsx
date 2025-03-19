const BannerHome2 = () => {
  const banners = [
    { src: './imgs/bannerHome/5.jpg', alt: 'Banner 1' },
    { src: './imgs/bannerHome/6.jpg', alt: 'Banner 2' },
    { src: './imgs/bannerHome/7.jpg', alt: 'Banner 3' },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-6 p-4">
        {/* Contenedor de banners con scroll horizontal en móviles */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 overflow-x-auto">
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner.src}
              alt={banner.alt}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Contenedor del video con ajuste responsivo */}
        <div className="w-full md:w-auto flex justify-center">
          <iframe
            className="rounded-lg shadow-lg w-full sm:w-[400px] md:w-[500px] h-[200px] sm:h-[250px] md:h-[300px]"
            src="https://www.youtube.com/embed/u_41KBQYfb4"
            title="Colono App // Club de especialistas"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

    </>

  );
};

export default BannerHome2;
