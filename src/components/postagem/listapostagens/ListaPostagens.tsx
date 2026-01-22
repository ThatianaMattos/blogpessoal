import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
      return;
    }

    buscarPostagens();
  }, [token]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
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
