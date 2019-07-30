import { Router } from "express";
import api from "./api";
import home from "./home";

const router = Router();

router.use('/', home);
router.use('/api', api);

export default router;