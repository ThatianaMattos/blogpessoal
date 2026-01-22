import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
  const navigate = useNavigate();

  // Controle de loading para exibir o spinner durante a requisição
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado que armazena a lista de temas retornada pela API
  const [temas, setTemas] = useState<Tema[]>([]);

  // Dados do usuário autenticado + função de logout para caso de token inválido (401)
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    // Proteção de rota: se não existir token, o usuário não está autenticado
    // e deve ser redirecionado para o login.
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    // Busca os temas ao montar o componente e sempre que a quantidade de itens mudar
    buscarTemas();
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);

      // Requisição protegida: envia o token no header Authorization
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      // Se o token expirar ou for inválido, a API retorna 401 e efetuamos logout
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        // Feedback para outros erros (rede, servidor, etc.)
        ToastAlerta("Erro ao buscar os temas!", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
