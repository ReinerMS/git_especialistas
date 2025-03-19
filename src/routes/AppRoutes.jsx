import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";  // Asegúrate de importar el Layout
import HomePage from "../pages/HomePage";
import FiltroEspecialistas from "../pages/FiltrosEspecialista";
import ProvinceFilterPage from "../pages/FiltroProvincia";
import AreaTrabajoFilterPage from "../pages/FiltroAreaTrabajo";
import FiltroResultados from "../pages/FiltroResultados";
import DetailPage from "../pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/especialistas",
    element: (
      <Layout>
        <FiltroEspecialistas />
      </Layout>
    ),
  },
  {
    path: "/filtro/provincia",
    element: (
      <Layout>
        <ProvinceFilterPage />
      </Layout>
    ),
  },
  {
    path: "/filtro/area-trabajo",
    element: (
      <Layout>
        <AreaTrabajoFilterPage />
      </Layout>
    ),
  },
  {
    path: "/resultados",
    element: (
      <Layout>
        <FiltroResultados />
      </Layout>
    ),
  },
  {
    path: "/detalle/:id",
    element: (
      <Layout>
        <DetailPage />
      </Layout>
    ),
  },
]);

export default router;
