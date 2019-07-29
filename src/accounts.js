const router = require('express').Router();
const fs = require('fs');
const crypto = require('crypto');
const { DATA_PATH } = require('./constants');
const { checkAccountKey } = require('./common');

// all accounts
router.get('/', function (req, res) {
    fs.readFile(`${DATA_PATH}/accounts.json`, 'utf8', (err, data) => {
        if (err) {
            res.json({ success: true, data: [] });
        } else {
            const accounts = JSON.parse(data);
            const result = accounts.map(a => ({
                name: a.name
            }));

            res.json({ success: true, data: result });
        }
    });
});

// create new account
router.post('/', function (req, res) {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        return res.json({ success: false, message: "An account name is not specified." });
    }

    fs.readFile(`${DATA_PATH}/accounts.json`, 'utf8', (err, data) => {
        let accounts = [];
        if (!err) {
            accounts = JSON.parse(data);
        }

        if (!!accounts.find(f => f.name === name)) {
            res.status(400);
            return res.json({ success: false, message: "An account with the same name already exists." });
        }

        const newAccount = {
            name: name,
            key: crypto.randomBytes(64).toString('hex')
        };

        accounts.push(newAccount);

        fs.writeFile(`${DATA_PATH}/accounts.json`, JSON.stringify(accounts), 'utf8', (err) => {
            if (err) {
                res.status(400);
                return res.json({ success: false, message: "An error has occured." });
            }

            return res.json({ 
                success: true, 
                message: "The account was created successfully.", 
                data: newAccount 
            });
        });
    });
});

router.delete('/:name', async function (req, res) {
    const { name } = req.params;
    const { key } = req.query;

    const isValidKey = await checkAccountKey(name, key);
    if (!isValidKey) {
        res.status(401);
        return res.json({ success: false, message: "Invalid account key." });
    }

    fs.readFile(`${DATA_PATH}/accounts.json`, 'utf8', (err, data) => {
        if (err) {
            return res.json({ success: true, message: "An account with the same name doesn't exist." });
        }

        let accounts = JSON.parse(data);
        if (!accounts.find(f => f.name === name)) {
            return res.json({ success: true, message: "An account with the same name doesn't exist." });
        }

        accounts = accounts.filter(f => f.name !== name);

        fs.writeFile(`${DATA_PATH}/accounts.json`, JSON.stringify(accounts), 'utf8', (err) => {
            if (err) {
                res.status(400);
                return res.json({ success: false, message: "An error has occured." });
            }

            // ToDo: delete all modules, related with the account 

            return res.json({ 
                success: true, 
                message: "The account was deleted successfully."
            });
        });
    });
})

module.exports = router;