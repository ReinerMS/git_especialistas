import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import FiltroEspecialistas from "../pages/FiltrosEspecialista";
import ProvinceFilterPage from "../pages/FiltroProvincia";
import AreaTrabajoFilterPage from "../pages/FiltroAreaTrabajo";
import FiltroResultados from "../pages/FiltroResultados";
import DetailPage from "../pages/DetailPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/especialistas" element={<Layout><FiltroEspecialistas /></Layout>} />
        <Route path="/filtro/provincia" element={<Layout><ProvinceFilterPage /></Layout>} />
        <Route path="/filtro/area-trabajo" element={<Layout><AreaTrabajoFilterPage /></Layout>} />
        <Route path="/resultados" element={<Layout><FiltroResultados /></Layout>} />
        <Route path="/detalle/:id" element={<Layout><DetailPage /></Layout>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
