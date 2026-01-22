import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
  const navigate = useNavigate();

  // Controle do loading para exibir o spinner durante a requisição
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado que armazena as postagens retornadas pela API
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  // Recupera o token e a função de logout através do AuthContext (Context API)
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    // Proteção de rota: sem token, o usuário não está autenticado
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
      return;
    }

    // Se o token estiver presente, buscamos as postagens no backend
    buscarPostagens();
  }, [token]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      // Requisição protegida: envia token no header Authorization
      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      // Se o token for inválido/expirado (401), força logout
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        // Feedback visual para outros erros (rede, servidor, etc.)
        ToastAlerta("Erro ao buscar as postagens!", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white">
      {isLoading && (
        <div className="flex justify-center w-full py-10">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          {!isLoading && postagens.length === 0 && (
            <div className="text-center py-16">
              <span className="text-3xl">Nenhuma Postagem foi encontrada!</span>
            </div>
          )}

          {!isLoading && postagens.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postagens.map((postagem) => (
                <CardPostagem key={postagem.id} postagem={postagem} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaPostagens;
