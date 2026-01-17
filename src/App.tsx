import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function AppRoutes() {
  const { usuario } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {usuario.token !== "" && <Navbar />}

      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
