import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

// Tipagem do contexto: define quais dados e funções ficarão disponíveis
// para qualquer componente que consumir o AuthContext.
interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

// Tipagem do Provider: recebe os componentes filhos que terão acesso ao contexto.
interface AuthProviderProps {
  children: ReactNode;
}

// Criação do Contexto de autenticação.
// Ele centraliza o estado do usuário logado e as ações de login/logout.
export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  // Estado do usuário autenticado.
  // O token vazio representa que nenhum usuário está logado.
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  // Estado de loading para controle visual (ex: botão de login com spinner)
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    // Inicia loading antes de fazer a requisição de login
    setIsLoading(true);

    try {
      // Realiza o login no backend e atualiza o estado usuario com o retorno da API.
      // Isso inclui dados do usuário e o token JWT para autenticação nas próximas requisições.
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);

      // Feedback visual de sucesso
      ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
    } catch (error) {
      // Feedback visual de erro (credenciais inválidas ou falha de autenticação)
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
    }

    // Finaliza loading ao término da requisição (sucesso ou erro)
    setIsLoading(false);
  }

  function handleLogout() {
    // Logout: limpa o estado do usuário e remove o token.
    // Após isso, o usuário perde acesso às rotas protegidas do sistema.
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    // Disponibiliza o estado usuario, as funções login/logout e isLoading
    // para toda a aplicação (componentes filhos).
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
