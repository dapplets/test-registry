import express from "express";
import { getAccountList, createAccount, deleteAccount } from "../../services/accounts";
import { asyncHandler } from "../../common/helpers";

const router = express.Router();

// all accounts
router.get('/', function (req, res) {
    const accountNames = getAccountList();
    res.json({
        success: true,
        data: accountNames
    });
});

// create new account
router.post('/:name', asyncHandler(async function (req, res) {
    const { name } = req.params;
    const key = await createAccount(name);
    return res.json({
        success: true,
        message: "The account was created successfully.",
        data: { name, key }
    });
}));

router.delete('/:name', asyncHandler(async function (req, res) {
    const { name } = req.params;
    const { key } = req.query;
    
    await deleteAccount(name, key);
    return res.json({
        success: true,
        message: "The account was deleted successfully."
    });
}));

export default router;