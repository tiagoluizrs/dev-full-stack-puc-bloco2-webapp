# CineSync 🎬 – Sua Lista de Filmes e Séries com Anotações Inteligentes

Aplicação front-end desenvolvida como parte do MVP da disciplina de Desenvolvimento Front-end Avançado. O CineSync é um gerenciador pessoal de filmes e séries, permitindo favoritar, anotar impressões e acompanhar o progresso de séries de maneira interativa e responsiva.

Este projeto utiliza React, React Router, componentização, consumo de API externa (The Movie Database), armazenamento local (localStorage) e boas práticas de usabilidade.

## 🚀 Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/cinesync.git
cd cinesync
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse em: http://localhost:5173

### 🧱 Organização do Projeto

```md
## 📁 Estrutura base de pastas (Alguns arquivos foram omitidos para simplificação, mas estão presentes no projeto. Veja o código fonte completo no repositório.)
cinesync/
├── public/               # Arquivos estáticos
├── app/                  # Código-fonte da aplicação
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Hooks personalizados    
│   ├── pages/            # Páginas da aplicação
│   ├── routes/           # Configuração de rotas
│   ├── services/         # Serviços de API e armazenamento
│   ├── app.css           # Estilos globais
│   └── root.tsx          # Componente raiz da aplicação
│   └── routes.tsx        # Configuração de rotas da aplicação
├── package.json          # Dependências e scripts
└── vite.config.js        # Configuração do Vite
```

## 🔄 Componentes reutilizáveis

- `<Appbar />`: Como navegação entre páginas
- `<CardList />`: Utilizado para exibir filmes e séries de forma visual
- `<NoteDialog />`: Modal reutilizado em mais de uma tela para gerenciar anotações
- `<SearchBar />`: Barra de pesquisa para encontrar filmes e séries

Os demais não tiveram modificações, apenas são componentes de terceiros puros sem customização.

## 📋 Formulário com validação (`NoteDialog`):

Implementado na tela de detalhe dos filmes e séries (ItemPage - Item.tsx) 

- Campos obrigatórios (Campo nota se for filme ou campo episódios (quantidade) assistidos se for uma série);
- Comentários exigindo um mínimo de 50 caracteres com feedback visual caso não seja adicionado o valor mínimo, e também um campo com a quantidade atual de caractéres que altera conforme for sendo adicionado texto;
- Salvo no `localStorage`;
- Dados exibidos na tela de detalhes (`ItemPage - Item.tsx`) com opção de edição/exclusão.

## 🔗 Roteamento com React Router

- Rotas configuradas com `@react-router/dev`
- Utilização dos hooks:
    - `useNavigate`: redirecionamento de rotas após ações
    - `useParams`: captura do ID e tipo do item na URL
    - `useLocation`: leitura do estado e rota atual para o menu exibir uma borda na página atual
- Implementação de rota 404 em `NotFound.tsx`

## 🔌 API externa: The Movie Database (TMDB)

- **API:** [https://developer.themoviedb.org](https://developer.themoviedb.org)
- **Licença:** Gratuita para uso educacional. Requer autenticação com **API Key (Token de Leitura)** via variável de ambiente:
- **Integração feita com:** `axios` através do serviço `api.ts`
- **Idioma configurado:** `pt-BR`
- **Rotas utilizadas:**
- `GET /movie/popular` → Lista de filmes populares
- `GET /tv/popular` → Lista de séries populares
- `GET /search/movie?query=` → Busca de filmes por nome
- `GET /search/tv?query=` → Busca de séries por nome
- `GET /movie/{id}` → Detalhes de um filme
- `GET /tv/{id}` → Detalhes de uma série
- **Tratamento de dados:**
- Requisições feitas com `axios` e tratadas em `try/catch`
- Mensagens de erro amigáveis na interface
- Indicadores visuais de carregamento (`CircularProgress`)
- Feedback de "Nenhum item encontrado" quando necessário
- Chave de API: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0OWRlOWNkNzQ1YzI0ZjQ2ODdkMzc0NmNkMDhlMSIsIm5iZiI6MTc1MTc1Nzg2Ni43NCwic3ViIjoiNjg2OWI0MmFhZjZiNTI4NTA4ZWQ1MWRmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IgOfnS2fQYpSRTBjIu1MFvN_f9CU3Wag5U9y0FA25Gc"


## 🧩 Melhoria da experiência do usuário

- Loaders com `CircularProgress`
- `Snackbar` para feedbacks de sucesso/erro
- Mensagens como "Nenhum item encontrado"
- Layout responsivo usando `@mui/material`

## 🧼 Boas práticas

- Componentes bem nomeados e divididos por responsabilidades
- Projeto hospedado no GitHub:
  👉 [https://github.com/tiagoluizrs/dev-full-stack-puc-bloco2-webapp](https://github.com/tiagoluizrs/dev-full-stack-puc-bloco2-webapp)