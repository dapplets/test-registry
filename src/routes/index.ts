import { Router } from "express";
import * as home from "../controllers/home";
import * as awsStorage from "../controllers/storage";
import * as s3 from "../controllers/s3";
import multer from "multer";

const upload = multer();
const router = Router();

router.get('/', home.index);
router.get('/storage/:id', awsStorage.getById);
router.post('/storage', upload.single('file'), awsStorage.post);
router.get('/s3/:id', s3.post);

export default router;