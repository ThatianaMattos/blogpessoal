import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";

import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  // Ano dinâmico para manter o copyright sempre atualizado
  const data = new Date().getFullYear();

  // Recupera o usuário autenticado via Context API
  const { usuario } = useContext(AuthContext);

  // Variável responsável por armazenar o JSX renderizável do Footer
  // Será exibido apenas quando o usuário estiver logado (token preenchido).
  let component: ReactNode;

  // Renderização condicional:
  // Se o token existir, o Footer é renderizado.
  // Se não existir, o Footer não aparece (evita mostrar conteúdo para usuário não autenticado).
  if (usuario.token !== "") {
    component = (
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-6 text-center gap-2">
          {/* Informações do sistema */}
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>

          {/* Links externos (redes sociais) */}
          <p className="text-lg">Acesse minhas redes sociais</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/thatiana-mattos/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <LinkedinLogoIcon size={48} weight="bold" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <InstagramLogoIcon size={48} weight="bold" />
            </a>

            <a
              href="https://github.com/ThatianaMattos"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <GithubLogoIcon size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Caso o token esteja vazio, component fica undefined e o Footer não aparece */}
      {component}
    </>
  );
}

export default Footer;
