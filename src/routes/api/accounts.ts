import express from "express";
import { AccountService } from "../../services/accountService";
import { asyncHandler } from "../../common/helpers";

const router = express.Router();
const accountService = new AccountService();

// all accounts
router.get('/', function (req, res) {
    const accountNames = accountService.getList();
    res.json({
        success: true,
        data: accountNames
    });
});

// create new account
router.post('/:name', asyncHandler(async function (req, res) {
    const { name } = req.params;
    const key = await accountService.create(name);
    return res.json({
        success: true,
        message: "The account was created successfully.",
        data: { name, key }
    });
}));

router.delete('/:name', asyncHandler(async function (req, res) {
    const { name } = req.params;
    const { key } = req.query;
    
    await accountService.delete(name, key);
    return res.json({
        success: true,
        message: "The account was deleted successfully."
    });
}));

export default router;