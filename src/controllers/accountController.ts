import express from "express";
import { AccountService } from "../services/accountService";

const router = express.Router();
const accountService = new AccountService();

// all accounts
router.get('/', async function (req, res) {
    const accountNames = accountService.getList();
    res.json({
        success: true,
        data: accountNames
    });
});

// create new account
router.post('/:name', async function (req, res) {
    const { name } = req.params;

    try {
        const key = await accountService.create(name);
        return res.json({
            success: true,
            message: "The account was created successfully.",
            data: { name, key }
        });
    } catch (e) {
        res.status(400);
        return res.json({
            success: false,
            message: e.message
        });
    }
});

router.delete('/:name', async function (req, res) {
    const { name } = req.params;
    const { key } = req.query;

    try {
        await accountService.delete(name, key);
        return res.json({
            success: true,
            message: "The account was deleted successfully."
        });
    } catch (e) {
        res.status(e.name == "AuthError" ? 401 : 400);
        return res.json({
            success: false,
            message: e.message
        });
    }
})

export default router;