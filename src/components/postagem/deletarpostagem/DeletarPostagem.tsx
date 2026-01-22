import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();

  // Loading do botão "Sim" durante a exclusão
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado com a postagem buscada pelo id (para confirmar antes de deletar)
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  // Recupera o id da postagem pela URL
  const { id } = useParams<{ id: string }>();

  // Recupera token e função de logout via Context API
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      // Busca a postagem no backend para exibir os dados antes da exclusão
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      // Se token inválido/expirado (401), força logout
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar a postagem.", "erro");
      }
    }
  }

  useEffect(() => {
    // Proteção de rota: sem token, o usuário não está autenticado
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    // Se existir id, carrega a postagem para confirmação
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    // Retorna para a listagem de postagens
    navigate("/postagens");
  }

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      // Remove a postagem no backend
      await deletar(`/postagens/${id}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Postagem apagada com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Postagem
        </header>

        <div className="p-4">
          <p className="text-xl h-full">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarPostagem}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
