import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  // Loading do botão de submit durante o cadastro/atualização
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lista de temas para popular o select
  const [temas, setTemas] = useState<Tema[]>([]);

  // Tema selecionado no select
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });

  // Estado do formulário da postagem
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  // Token e usuário autenticado via Context API
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Se tiver id, estamos no modo edição
  const { id } = useParams<{ id: string }>();

  async function buscarPostagemPorId(id: string) {
    try {
      // Busca a postagem para edição
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar a postagem!", "erro");
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      // Busca o tema selecionado para associar na postagem
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar o tema selecionado!", "erro");
      }
    }
  }

  async function buscarTemas() {
    try {
      // Busca todos os temas para preencher o select
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar os temas!", "erro");
      }
    }
  }

  useEffect(() => {
    // Proteção de rota: sem token, redireciona para login
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    // Ao carregar o componente:
    // - carrega a lista de temas
    // - se houver id, carrega a postagem para edição
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    // Sempre que o tema mudar, atualiza a postagem com o tema selecionado
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    // Atualiza campos do formulário e associa usuário + tema na postagem
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    // Volta para a listagem de postagens
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Modo edição: atualiza
    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: token },
        });

        ToastAlerta("Postagem atualizada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a postagem.", "erro");
        }
      }
    } else {
      // Modo cadastro: cria nova
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: token },
        });

        ToastAlerta("Postagem cadastrada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a postagem.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  // Bloqueia o botão enquanto nenhum tema foi selecionado
  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoTema}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
