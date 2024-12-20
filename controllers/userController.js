const fileHelper = require('../utils/fileHelper');

// Rota: Listar todos os usuários
const listUsers = async (req, res) => {
    const users = await fileHelper.readFile('users');
    return res.status(200).json(users);
};

// Rota: Atualizar dados do usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const users = await fileHelper.readFile('users');
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const updatedUser = { ...users[userIndex], username, password };
    users[userIndex] = updatedUser;
    await fileHelper.writeFile('users', users);

    return res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
};

// Rota: Excluir um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;

    const users = await fileHelper.readFile('users');
    const filteredUsers = users.filter(user => user.id !== parseInt(id));

    if (users.length === filteredUsers.length) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await fileHelper.writeFile('users', filteredUsers);
    return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
};

module.exports = { listUsers, updateUser, deleteUser };
