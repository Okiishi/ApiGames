const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data');

const readFile = async (fileName) => {
    const filePath = path.join(dataPath, `${fileName}.json`);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const writeFile = async (fileName, data) => {
    const filePath = path.join(dataPath, `${fileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readFile, writeFile };
