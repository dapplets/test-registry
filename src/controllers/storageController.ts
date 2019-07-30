import express from "express";
import { StorageService } from "../services/storageService";
import multer from "multer";
import { asyncHandler } from "../common/helpers";

const upload = multer();

const router = express.Router();
const storageService = new StorageService();

router.get('/:id', asyncHandler(async function (req, res) {
    const { id } = req.params;
    const buf = await storageService.get(id);
    return res.end(buf, 'binary');
}));

router.post('/', upload.single('file'), async function (req, res) {
    const file = req.file;
    if (!file) return res.json({ success: false, message: "Invalid request." });
    const id = await storageService.save(file.buffer);
    return res.json({ success: true, data: id });
});

router.delete('/:id', asyncHandler(async function (req, res) {
    const { id } = req.params;
    await storageService.delete(id);
    return res.json({ success: true });
}));

export default router;