# User Management API

Sistema centralizado de gerenciamento de usuários e autenticação para múltiplas equipes.

## 📋 Sobre o Projeto

Esta API serve como **centro do sistema**, fornecendo serviços de autenticação e gerenciamento de usuários para todas as outras equipes/projetos. Oferece endpoints para criação, autenticação e gestão de usuários com suporte a autenticação tradicional (email/senha) e Magic Link.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Knex.js** - Query builder SQL
- **PostgreSQL** (Supabase) - Banco de dados
- **JWT** - Autenticação via tokens
- **bcrypt** - Hash de senhas
- **Nodemailer** - Envio de emails
- **Swagger** - Documentação da API

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database (Supabase)
DB_HOST=your_supabase_host

# JWT
JWT_SECRET=3f8x!B2q9$zP5%vK7&mY4*W6eD1c

# Email
GMAIL_USER=domain.gmail.com
GMAIL_APP_PASSWORD=create_gmail_password

# Server
NODE_ENV=development
```

### 2. Instalação

```bash
# Clone o repositório
git clone https://github.com/CainaZumaa/controle-users.git
cd backend

# Instale as dependências
npm install

# Configure o banco de dados (execute seeds)
npm run seed

# Inicie o servidor
npm run dev
```

### 3. Seeds do Banco

Para popular o banco com dados iniciais:

```bash
npx knex seed:run
```

## 🔐 Autenticação

### JWT Token
- **Duração**: 24 horas
- **Formato**: Bearer Token
- **Header**: `Authorization: Bearer <token>`

### Magic Link
- **Duração**: 15 minutos
- **Uso**: Autenticação sem senha via email

## 📚 Documentação da API

### Swagger UI
Acesse a documentação interativa em: `http://localhost:3000/api-docs`

### Endpoints Principais

#### 🔑 Autenticação
```http
POST /login
POST /auth/magic
```

#### 👥 Usuários
```http
POST   /usuarios         # Criar usuário (pública)

GET    /usuarios         # Listar usuários (privada)
GET    /usuarios/:id     # Buscar usuário (privada)
PUT    /usuarios/:id     # Atualizar usuário (privada)
PATCH  /usuarios/:id     # Atualização parcial (privada)
DELETE /usuarios/:id     # Remover usuário (privada)
```

### Exemplos de Uso

#### Login Tradicional
```javascript
// Request
POST /login
{
  "email": "usuario@example.com",
  "senha": "123456"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "Diego Cardoso",
    "email": "diego@example.com"
  }
}
```

#### Magic Link
```javascript
// Request
POST /auth/magic
{
  "email": "usuario@example.com"
}

// Response
{
  "success": true,
  "message": "Link enviado!",
  "Link": "http://localhost:3000/auth/magic/verify?token=abc123"
}
```

#### Criar Usuário
```javascript
// Request
POST /usuarios
{
  "nome": "Diego Cardoso",
  "email": "diego@example.com",
  "senha": "senha123"
}

// Response
{
  "message": "Usuário criado com sucesso"
}
```

## 🏗️ Arquitetura

O projeto segue a arquitetura em camadas:

```
src/
├── usuario/
│   ├── controller.js    # Lógica de controle HTTP
│   ├── service.js       # Regras de negócio
│   ├── repository.js    # Acesso aos dados
│   ├── model.js         # Modelo/Validação
│   └── route.js         # Definição de rotas
├── magicAuth/
│   ├── controller.js
│   ├── magicAuthService.js
│   └── emailService.js
├── middlewares/
│   └── auth.js          # Middleware de autenticação
└── swagger.json         # Documentação API
```
## 🔑 Validação de Token JWT
O token pode ser validado verificando sua assinatura pelo site jwt.io _(https://jwt.io/)_

## ⚖️ Regras de Negócio
Usuários com mais de 30 dias de cadastro são automaticamente desativados.

### Princípios Seguidos
- **Separação de responsabilidades**
- **Código limpo e manutenível**
- **Validação de dados**
- **Tratamento de erros**
- **Segurança (hash de senhas, JWT)**

## 🔒 Segurança

- Senhas hasheadas com **bcrypt** (salt 8)
- Tokens JWT assinados e com expiração
- Magic Links com tempo limitado (15 min)
- Validação de entrada de dados
- Middleware de autenticação para rotas protegidas

## 🤝 Integração com Outras Equipes

### Para Desenvolvedores de Outras Equipes

1. **Base URL**: `http://localhost:3000`
2. **Documentação**: `/api-docs`
3. **Autenticação**: Inclua o header `Authorization: Bearer <token>`
4. **Adicione no .env**: `JWT_SECRET=3f8x!B2q9$zP5%vK7&mY4*W6eD1c`
5. **Criação de Usuários**: Endpoint público em `/usuarios`
6. **Validação de Token**: Decodifique o JWT para obter dados do usuário

### Exemplo de Integração

```javascript
// Criar usuário
const response = await fetch('http://localhost:3000/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'Novo Usuário',
    email: 'novo@example.com',
    senha: 'senha123'
  })
});

// Fazer login
const loginResponse = await fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'novo@example.com',
    senha: 'senha123'
  })
});

const { token } = await loginResponse.json();

// Usar token nas próximas requisições
const protectedResponse = await fetch('http://localhost:3000/usuarios', {
  headers: { 
    'Authorization': `Bearer ${token}` 
  }
});
```

## 📝 Scripts Disponíveis

```bash
npm i           # Instala todas as dependências do projeto
npm run dev     # Inicia servidor em modo desenvolvimento
npm run seed    # Executa seeds do banco de dados
```

**Desenvolvido para o Projeto Backend Acadêmico** | Equipe Backend - Sistema de Gerenciamento de Usuários _(Users Management)_
