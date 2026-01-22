import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  const navigate = useNavigate();

  // Estado que armazena o tema buscado pelo id (para exibir antes de excluir)
  const [tema, setTema] = useState<Tema>({} as Tema);

  // Controle de loading do botão "Sim"
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Recupera token e função de logout via Context API
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Recupera o id do tema pela URL
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      // Busca o tema no backend para confirmar com o usuário antes de deletar
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      // Se token inválido/expirado (401), força logout
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar o tema.", "erro");
      }
    }
  }

  useEffect(() => {
    // Proteção de rota: sem token, usuário não está autenticado
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    // Se existir id, carrega o tema a ser deletado
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    // Retorna para a lista de temas
    navigate("/temas");
  }

  async function deletarTema() {
    setIsLoading(true);

    try {
      // Remove o tema no backend
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Tema deletado com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o tema.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>

        <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className={`w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center gap-2
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={deletarTema}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ClipLoader color="#ffffff" size={22} />
                <span>Deletando...</span>
              </>
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
