import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();

  // Recupera o usuário autenticado e a função de logout via Context API
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    // Logout: limpa o estado do usuário e remove o token do contexto
    handleLogout();

    // Feedback visual para confirmar a ação para o usuário
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");

    // Redireciona para a rota inicial (login)
    navigate("/");
  }

  // Variável responsável por armazenar o JSX renderizável do Navbar
  // A ideia é renderizar o menu apenas quando existir token (usuário logado).
  let component: ReactNode;

  // Renderização condicional:
  // Se o token estiver preenchido, significa que o usuário está autenticado
  // e então exibimos o Navbar com as rotas protegidas.
  if (usuario.token !== "") {
    component = (
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          {/* Link principal da aplicação */}
          <Link to="/home" className="text-2xl font-bold">
            Blog Pessoal
          </Link>

          {/* Links de navegação disponíveis apenas para usuário autenticado */}
          <div className="flex gap-4">
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>

            <Link to="/temas" className="hover:underline">
              Temas
            </Link>

            <Link to="/cadastrartema" className="hover:underline">
              Cadastrar tema
            </Link>

            <Link to="/perfil" className="hover:underline">
              Perfil
            </Link>

            {/* Logout executa limpeza do contexto e redirecionamento */}
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Caso o token esteja vazio, component fica undefined e o Navbar não aparece */}
      {component}
    </>
  );
}

export default Navbar;
