import express from "express";
import { getFile, saveFile, deleteFile } from "../../services/storage";
import multer from "multer";
import { asyncHandler } from "../../common/helpers";

const upload = multer();

const router = express.Router();

router.get('/:id', asyncHandler(async function (req, res) {
    const { id } = req.params;
    const buf = await getFile(id);
    return res.end(buf, 'binary');
}));

router.post('/', upload.single('file'), async function (req, res) {
    const file = req.file;
    if (!file) return res.json({ success: false, message: "A file is not attached." });
    const id = await saveFile(file.buffer);
    return res.json({ success: true, data: id });
});

router.delete('/:id', asyncHandler(async function (req, res) {
    const { id } = req.params;
    await deleteFile(id);
    return res.json({ success: true, message: "The file was deleted." });
}));

export default router;