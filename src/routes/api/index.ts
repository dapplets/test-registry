import { Router } from "express";
import accounts from "./accounts";
import registry from "./registry";
import storage from "./storage";

const router = Router();

router.use('/accounts', accounts);
router.use('/registry', registry);
router.use('/storage', storage);

export default router;