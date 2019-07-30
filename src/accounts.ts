import express from "express";
import fs from "fs";
import crypto from "crypto";
import { DATA_PATH } from "./constants";
import { checkAccountKey, getDirectories } from "./common";
import rimraf from "rimraf";

const router = express.Router();

// all accounts
router.get('/', async function (req, res) {
    const accountNames = getDirectories(DATA_PATH);
    res.json({ success: true, data: accountNames });
});

// create new account
router.post('/:name', function (req, res) {
    const { name } = req.params;

    if (fs.existsSync(`${DATA_PATH}/${name}`)) {
        res.status(400);
        return res.json({ success: false, message: "An account with the same name already exists." });
    }

    const key = crypto.randomBytes(64).toString('hex');

    fs.mkdirSync(`${DATA_PATH}/${name}`);

    fs.writeFile(`${DATA_PATH}/${name}/secret.key`, key, 'utf8', (err) => {
        if (err) {
            res.status(400);
            return res.json({ success: false, message: "An error has occured." });
        }

        return res.json({ 
            success: true, 
            message: "The account was created successfully.", 
            data: { name, key }
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

    rimraf.sync(`${DATA_PATH}/${name}`);

    return res.json({ 
        success: true, 
        message: "The account was deleted successfully."
    });
})

export default router;