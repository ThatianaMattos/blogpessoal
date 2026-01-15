function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container flex justify-between text-lg mx-8">
          <h1 className="font-bold text-xl">Blog Pessoal</h1>

          <div className="flex gap-4">
            <a
              href="#"
              className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
            >
              Postagens
            </a>

            <a
              href="#"
              className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
            >
              Temas
            </a>

            <a
              href="#"
              className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
            >
              Cadastrar tema
            </a>

            <a
              href="#"
              className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
            >
              Perfil
            </a>

            <a
              href="#"
              className="px-3 py-1 rounded hover:bg-indigo-800 hover:underline transition-all duration-300"
            >
              Sair
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
