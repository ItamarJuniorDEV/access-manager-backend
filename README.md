# Sistema de Gestão de Acessos - Backend

## 📌 Descrição
O backend deste sistema foi desenvolvido em Node.js com Express e Sequelize, oferecendo uma API RESTful para o gerenciamento de usuários, controle de acessos temporários e autenticação.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT para autenticação
- Sucrase
- Cors
- Dotenv

## 📦 Requisitos

- Node.js 16+
- PostgreSQL 12+
- NPM ou Yarn

## 🛠 Instalação e Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd sistema-gestao-acessos-backend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure o banco de dados:
Edite o arquivo `src/config/database.js` conforme necessário:
```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'manage_access',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
```

4. Defina as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
```plaintext
JWT_SECRET=mysecretjwttoken12345
```

5. Execute as migrações do banco de dados:
```bash
npx sequelize db:migrate
```

6. Inicie o servidor:
```bash
npm run dev
# ou
yarn dev
```
O servidor estará disponível em `http://localhost:3333`.

## 📁 Estrutura do Projeto
```plaintext
src/
├── app/
│   ├── controllers/    # Controladores da aplicação
│   ├── middlewares/   # Middlewares personalizados
│   ├── models/        # Modelos Sequelize
│   └── utils/         # Utilitários e helpers
├── config/           # Configurações do projeto
├── database/
│   ├── migrations/   # Migrações do Sequelize
│   └── index.js      # Configuração da conexão
├── routes.js        # Definição das rotas
└── server.js        # Configuração do servidor Express
```

## 🔗 Rotas da API
### Autenticação
- `POST /login` - Autenticação de usuário
  - Body: `{ email, password }`

### Usuários
- `POST /user` - Criar novo usuário
  - Body: `{ name, email, password_hash }`
- `POST /user/approved` - Aprovar/Rejeitar usuário
  - Body: `{ email, approved }`

### Gerenciamento de Acessos
- `POST /manageAccess` - Conceder acesso
  - Body: `{ feature, user_id, final_date }`
- `POST /manageAccess/revoked` - Revogar acesso
  - Body: `{ feature, user_id }`

### Documentos
- `GET /documents` - Verificar acesso a documentos
  - Query: `{ user_id }`

## 🔒 Segurança
### Autenticação JWT
- Middleware de autenticação para rotas protegidas
- Token JWT com expiração de 60 minutos
- Verificação de token em todas as rotas protegidas

### Controle de Acesso
- Verificação de permissões por recurso
- Validação de datas de expiração
- Sistema de revogação de acessos

## 📊 Modelos de Dados
### User
```javascript
{
  id: UUID,
  name: String,
  email: String,
  password_hash: String,
  active: Boolean,
  type: Integer, // 1 = Admin, 2 = User
  created_at: DateTime,
  updated_at: DateTime
}
```

### UserManageAccess
```javascript
{
  id: UUID,
  feature: Integer, // 0 = Documents, 1 = RestrictedArea, 2 = InternalSystem
  user_id: UUID,
  initial_date: DateTime,
  final_date: DateTime,
  revoked: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

## 📈 Logs e Monitoramento
O sistema possui logs detalhados para:
- Erros de autenticação
- Operações no banco de dados
- Requisições à API
- Alterações de acesso

## 🚀 Deploy
Para ambiente de produção:
1. Configure as variáveis de ambiente adequadamente.
2. Execute o build:
```bash
npm run build
# ou
yarn build
```
3. Inicie o servidor:
```bash
npm start
# ou
yarn start
```

## ⚙️ Configurações Adicionais
### Nodemon
O projeto utiliza Nodemon com Sucrase para desenvolvimento:
```json
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

### Sequelize CLI
Comandos úteis do Sequelize:
```bash
# Criar nova migração
npx sequelize migration:create --name=create-users
# Executar migrações
npx sequelize db:migrate
# Reverter última migração
npx sequelize db:migrate:undo
```

## 📜 Licença
Este projeto está sob a licença [MIT](LICENSE).

## 👥 Autor
- Itamar Alves Ferreira Junior



## Modelo ER

![ER](https://github.com/user-attachments/assets/ccdbf86d-8dc3-42e9-8fff-212c6b7e0457)
