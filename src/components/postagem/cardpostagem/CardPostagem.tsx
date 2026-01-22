import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  const email = (postagem.usuario?.usuario ?? "").toLowerCase();
  const isAdmin = email === "root@root.com.br";

  const nome =
    postagem.usuario?.nome?.trim() || (isAdmin ? "Admin" : "Usuario");

  // Fallback padrão sempre carrega (ui-avatars)
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    nome
  )}&background=6366f1&color=fff&size=128&format=png`;

  const fotoRaw = (postagem.usuario?.foto ?? "").trim();

  // Bloqueia links problemáticos e vazios
  const fotoValida =
    fotoRaw.length > 0 &&
    !fotoRaw.includes("imgur.com") &&
    (fotoRaw.startsWith("http://") || fotoRaw.startsWith("https://"));

  const avatarFinal = fotoValida ? fotoRaw : fallback;

  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={avatarFinal}
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
            alt={isAdmin ? "Avatar administrador" : "Avatar usuário"}
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
          />

          <h3 className="text-lg font-bold uppercase">
            {isAdmin ? "ADMINISTRADOR" : "USUÁRIO"}
          </h3>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
          <p>{postagem.texto}</p>
          <p>Tema: {postagem.tema?.descricao}</p>
          <p>
            Data:{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>

      <div className="flex">
        <Link
          to=""
          className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to=""
          className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
