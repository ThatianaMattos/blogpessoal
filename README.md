# Blog Pessoal - Frontend (React)

Aplicação Frontend desenvolvida em **React + TypeScript**, como parte do Projeto **Blog Pessoal (Generation Brasil)**.  
A aplicação consome uma API REST (Backend em NestJS) e permite autenticação e gerenciamento de **Postagens** e **Temas**.

---

## Funcionalidades

### Autenticação

- Login de usuário
- Cadastro de usuário
- Logout
- Proteção de rotas (usuário precisa estar autenticado)

### Postagens

- Listar postagens
- Cadastrar postagem
- Editar postagem
- Deletar postagem (com confirmação)

### Temas

- Listar temas
- Cadastrar tema
- Editar tema
- Deletar tema (com confirmação)

---

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Spinners (loading)
- Toast/Alerts personalizados (UI Feedback)

---

## Deploy

Frontend publicado na **Vercel**:

✅ Link do Deploy: <https://blogpessoal-gjzs.vercel.app>

Backend publicado na **Render** (API REST):

✅ Base URL: <https://blogpessoal-nest-brzb.onrender.com>

---

## Variáveis de Ambiente

Este projeto utiliza variável de ambiente para ocultar a URL do Backend.

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_URL=https://blogpessoal-nest-brzb.onrender.com
```  

Como executar o projeto localmente

1.Clonar o repositório
git clone <https://github.com/ThatianaMattos/blogpessoal.git>

2.Acessar a pasta do projeto
cd blogpessoal

3.Instalar as dependências
npm install

4.Configurar o .env

Crie o arquivo .env na raiz do projeto e adicione:

VITE_API_URL=<https://blogpessoal-nest-brzb.onrender.com>

5.Rodar a aplicação
npm run dev

A aplicação estará disponível em:

📍 <http://localhost:5173>

Observações importantes
Antes de testar o projeto, verifique se o Backend está ativo (Render pode hibernar e demorar alguns segundos para responder).

Não altere o usuário padrão (root) utilizado pelos instrutores para validação e correção do projeto.

Status do Projeto

✅ Finalizado e testado localmente e em produção (Vercel)

Autora

Thatiana Mattos
GitHub: <https://github.com/ThatianaMattos>

LinkedIn: <https://www.linkedin.com/in/thatiana-mattos>
