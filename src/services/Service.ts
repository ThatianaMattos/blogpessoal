import axios from "axios";

/**
 * Instância do Axios com uma baseURL dinâmica.
 * A URL vem do arquivo .env (variável VITE_API_URL),
 * permitindo trocar o endereço do backend sem mexer no código.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Cadastra um novo usuário (rota pública, não precisa de token).
 */
export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

/**
 * Realiza login do usuário (rota pública, não precisa de token).
 */
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

/**
 * Busca dados na API (GET).
 * Recebe o header como parâmetro para casos que exigem Authorization com token.
 */
export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

/**
 * Cadastra um novo recurso (POST).
 * Usado para cadastrar Tema ou Postagem, por exemplo.
 */
export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

/**
 * Atualiza um recurso existente (PUT).
 * Usado para editar Tema ou Postagem.
 */
export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

/**
 * Deleta um recurso (DELETE).
 * Usado para apagar Tema ou Postagem.
 */
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
