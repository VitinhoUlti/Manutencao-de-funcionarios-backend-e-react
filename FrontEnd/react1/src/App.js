import { Route, Routes } from "react-router-dom";
import Inclusao from "./components/Inclusão";
import MenuSuperior from "./components/MenuSuperior";
import Manutenção from "./components/Manutenção";
import Resumo from "./components/Resumo";

function App() {
  return (
    <>
    <MenuSuperior />
    <Routes>
      <Route path="/" element={<Inclusao />} />
      <Route path="manut" element={<Manutenção />} />
      <Route path="resumo" element={<Resumo />} />
    </Routes>
    </>
  );
}

export default App;
