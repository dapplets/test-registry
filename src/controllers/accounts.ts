import { getAccountList, createAccount, deleteAccount } from "../services/accounts";
import { asyncHandler } from "../common/helpers";

export function index(req: any, res: any) {
    const accountNames = getAccountList();
    res.json({
        success: true,
        data: accountNames
    });
}

export function create(req: any, res: any) {
    const { name } = req.params;
    const key = createAccount(name);
    return res.json({
        success: true,
        message: "The account was created successfully.",
        data: { name, key }
    });
}

export const del = asyncHandler(async function (req: any, res: any) {
    const { name } = req.params;
    const { key } = req.query;

    await deleteAccount(name, key);
    return res.json({
        success: true,
        message: "The account was deleted successfully."
    });
})