# API REST de Jogos

Este projeto é uma API REST desenvolvida com o framework **Express** para gerenciar informações de jogos e usuários. O sistema permite operações CRUD completas, autenticação JWT, gerenciamento de usuários e documentação com Swagger.

---

## **Funcionalidades**

### **Autenticação e Usuários**
- Cadastro de usuários.
- Login com geração de token JWT.
- Gerenciamento de usuários (administradores podem excluir e criar outros usuários).
- Rota de instalação para criar um administrador padrão (`GET /install`).

### **Jogos**
- Operações CRUD para jogos (autenticado).
- Relacionamento entre jogos e gêneros.
- Paginação nas listagens.

### **Documentação**
- Documentação interativa disponível em `GET /docs` utilizando Swagger.

---

## **Tecnologias Utilizadas**

- **Node.js**
- **Express**
- **JSON** para persistência de dados.
- **JWT** para autenticação.
- **Swagger** para documentação.

---