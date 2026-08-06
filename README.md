# Projeto de Login com SQLite

Aplicação de exemplo com cadastro, login e exclusão de usuário usando Node.js, Express e SQLite.

## Estrutura
- `server.js`: configuração do servidor Express
- `db/index.js`: inicialização do banco SQLite
- `controllers/authController.js`: lógica de cadastro, login, logout e exclusão
- `routes/authRoutes.js`: rotas de autenticação
- `routes/viewRoutes.js`: rotas das páginas de login e cadastro
- `routes/userRoutes.js`: rota que lista usuários em HTML
- `views/`: páginas HTML do site
- `db/database.sqlite`: arquivo do banco de dados

## Como rodar

1. Instale dependências:
```bash
npm install
```

2. Execute o servidor:
```bash
npm start
```

3. Acesse no navegador:
```
http://localhost:3000
```

## Rotas úteis
- `GET /` — página de login
- `GET /cadastro` — página de cadastro
- `POST /cadastro` — envia cadastro
- `POST /login` — envia login
- `POST /logout` — faz logout
- `POST /deletar-conta` — exclui a conta do usuário logado
- `GET /users` — lista de usuários cadastrados

## Observações
- As senhas são armazenadas com hash usando `bcryptjs`.
- O banco SQLite fica em `db/database.sqlite`.
