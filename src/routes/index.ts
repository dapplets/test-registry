import { Router } from "express";
import multer from "multer";
import * as home from "../controllers/home";
import * as awsStorage from "../controllers/storage";
import * as s3 from "../controllers/s3";
import * as announcements from "../controllers/announcements";

const upload = multer();
const router = Router();

router.get('/', home.index);
router.get('/storage/:id', awsStorage.getById);
router.post('/storage', upload.single('file'), awsStorage.post);
router.post('/s3/presign', s3.post);
router.get('/announcements', announcements.get);

export default router;