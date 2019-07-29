const fs = require('fs');
const { DATA_PATH } = require('./constants'); 

const checkAccountKey = (name, key) => new Promise((resolve, reject) => {
    if (!name || !key) return resolve(false);

    if (!fs.existsSync(`${DATA_PATH}/${name}`)) {
        return resolve(false);
    }

    const existingKey = fs.readFileSync(`${DATA_PATH}/${name}/secret.key`, 'utf8');
    if (existingKey === key) {
        return resolve(true);
    } else {
        return resolve(false);
    }
});

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = { checkAccountKey, getDirectories };