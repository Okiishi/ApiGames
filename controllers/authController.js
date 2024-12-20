const jwt = require('jsonwebtoken');
const fileHelper = require('../utils/fileHelper');

const SECRET_KEY = 'supersecretkey';

// Rota: Registrar um novo usuário
const register = async (req, res) => {
    const { username, password, isAdmin } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
    }

    const users = await fileHelper.readFile('users');
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const newUser = { id: Date.now(), username, password, isAdmin: !!isAdmin };
    users.push(newUser);
    await fileHelper.writeFile('users', users);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
};

// Rota: Login do usuário
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
    }

    const users = await fileHelper.readFile('users');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login realizado com sucesso.', token });
};

module.exports = { register, login };
