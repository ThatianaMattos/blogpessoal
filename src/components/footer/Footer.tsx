import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-6 text-center gap-2">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>

          <p className="text-lg">Acesse nossas redes sociais</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <LinkedinLogoIcon size={48} weight="bold" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <InstagramLogoIcon size={48} weight="bold" />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 hover:scale-110"
            >
              <FacebookLogoIcon size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
