const fileHelper = require('../utils/fileHelper');

// Rota: Listar jogos com paginação
const listGames = async (req, res) => {
    
    const { limit = 10, page = 1 } = req.query;

    const validLimits = [5, 10, 30];
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (!validLimits.includes(parsedLimit) || parsedPage < 1) {
        return res.status(400).json({ message: 'Parâmetros de paginação inválidos.' });
    }

    const games = await fileHelper.readFile('games');
    const startIndex = (parsedPage - 1) * parsedLimit;
    const paginatedGames = games.slice(startIndex, startIndex + parsedLimit);

    return res.status(200).json(paginatedGames);
};

// Rota: Criar um novo jogo
const createGame = async (req, res) => {
    const { name, genre, platform, releaseYear } = req.body;

    if (!name || !genre || !platform || !releaseYear) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const games = await fileHelper.readFile('games');
    const newGame = { id: Date.now(), name, genre, platform, releaseYear };
    games.push(newGame);
    await fileHelper.writeFile('games', games);

    return res.status(201).json({ message: 'Jogo criado com sucesso.', game: newGame });
};

// Rota: Atualizar um jogo
const updateGame = async (req, res) => {
    const { id } = req.params;
    const { name, genre, platform, releaseYear } = req.body;

    const games = await fileHelper.readFile('games');
    const gameIndex = games.findIndex(game => game.id === parseInt(id));

    if (gameIndex === -1) {
        return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    const updatedGame = { ...games[gameIndex], name, genre, platform, releaseYear };
    games[gameIndex] = updatedGame;
    await fileHelper.writeFile('games', games);

    return res.status(200).json({ message: 'Jogo atualizado com sucesso.', game: updatedGame });
};

// Rota: Excluir um jogo
const deleteGame = async (req, res) => {
    const { id } = req.params;

    const games = await fileHelper.readFile('games');
    const filteredGames = games.filter(game => game.id !== parseInt(id));

    if (games.length === filteredGames.length) {
        return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    await fileHelper.writeFile('games', filteredGames);
    return res.status(200).json({ message: 'Jogo excluído com sucesso.' });
};

module.exports = { listGames, createGame, updateGame, deleteGame };
