import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full flex justify-center py-4 bg-indigo-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container flex justify-between text-lg mx-8">
        <Link to="/home" className="font-bold text-xl">
          Blog Pessoal
        </Link>

        <div className="flex gap-4">
          <Link
            to="/postagens"
            className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
          >
            Postagens
          </Link>

          <Link
            to="/temas"
            className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
          >
            Temas
          </Link>

          <Link
            to="/cadastrartema"
            className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
          >
            Cadastrar tema
          </Link>

          <Link
            to="/perfil"
            className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
          >
            Perfil
          </Link>

          <Link
            to="/"
            className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
          >
            Sair
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
