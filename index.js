const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/users', userRoutes); // Rotas de usuários
app.use('/games', gameRoutes); // Rotas de jogos

// Middleware de tratamento de erros
app.use(errorHandler);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Jogos',
            version: '1.0.0',
            description: 'Documentação da API de Jogos',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Servidor Local' }
        ]
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

