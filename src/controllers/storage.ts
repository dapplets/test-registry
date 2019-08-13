import { getFile, saveFile, deleteFile } from "../services/storage";
import { asyncHandler } from "../common/helpers";

export const getById = asyncHandler(async function (req: any, res: any) {
    const { id } = req.params;
    const buf = await getFile(id);
    return res.end(buf, 'binary');
})

export const post = async function (req: any, res: any) {
    const file = req.file;
    if (!file) return res.json({ success: false, message: "A file is not attached." });
    const id = await saveFile(file.buffer);
    return res.json({ success: true, data: id });
}

export const del = asyncHandler(async function (req: any, res: any) {
    const { id } = req.params;
    await deleteFile(id);
    return res.json({ success: true, message: "The file was deleted." });
})