import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  // Loading do botão de submit durante a requisição
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado do campo "confirmar senha" (separado do objeto usuario)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Estado do usuário a ser cadastrado
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    // Após cadastrar, o backend retorna o usuário com id preenchido.
    // Quando isso acontecer, redirecionamos para a página de login.
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    // Volta para a rota inicial (login)
    navigate("/");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    // Atualiza o objeto usuario com base no name do input
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    // Atualiza o estado do campo "confirmar senha"
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação básica:
    // - senha e confirmar senha devem ser iguais
    // - senha deve ter no mínimo 8 caracteres
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        // Cadastra o usuário no backend
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }

      setIsLoading(false);
      return;
    }

    // Caso as validações falhem, informamos o usuário e limpamos os campos de senha
    ToastAlerta(
      "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
      "erro"
    );

    setUsuario({ ...usuario, senha: "" });
    setConfirmarSenha("");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center" />

      <form
        className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
      >
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
          />
        </div>

        <div className="flex justify-around w-full gap-8">
          <button
            type="reset"
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
            onClick={retornar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Cadastrar</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;