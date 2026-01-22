import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  const data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-6 text-center gap-2">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>

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

  return <>{component}</>;
}

export default Footer;
