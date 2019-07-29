const fs = require('fs');
const { DATA_PATH } = require('./constants'); 

const checkAccountKey = (name, key) => new Promise((resolve, reject) => {
    if (!name || !key) resolve(false);
    
    fs.readFile(`${DATA_PATH}/accounts.json`, 'utf8', (err, data) => {
        if (err) {
            resolve(false);
        }

        const accounts = JSON.parse(data);
        if (!!accounts.find(f => f.name === name && f.key === key)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});

module.exports = { checkAccountKey };