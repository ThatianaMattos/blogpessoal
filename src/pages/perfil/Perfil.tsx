import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();

  // Obtém os dados do usuário autenticado a partir do AuthContext (Context API)
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    // Proteção de rota:
    // Se o token estiver vazio, significa que o usuário não está autenticado.
    // Nesse caso, exibimos uma mensagem e redirecionamos para a página de login.
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [usuario.token]); // Executa sempre que o token mudar (login/logout)

  return (
    <div className="flex justify-center mx-4">
      <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
        {/* Imagem de capa do perfil (fixa) */}
        <img
          className="w-full h-72 object-cover border-b-8 border-white"
          src="https://i.imgur.com/ZZFAmzo.jpg"
          alt="Capa do Perfil"
        />

        {/* Foto do usuário vinda do backend e armazenada no contexto */}
        <img
          className="rounded-full w-56 mx-auto -mt-32 border-8 border-white relative z-10"
          src={usuario.foto}
          alt={`Foto de perfil de ${usuario.nome}`}
        />

        {/* Card com os dados principais do usuário logado */}
        <div className="relative -mt-24 h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.usuario}</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
