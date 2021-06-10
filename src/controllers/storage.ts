import { getFile, saveFile } from "../services/s3";
import { asyncHandler } from "../common/helpers";

export const getById = asyncHandler(async function (req: any, res: any) {
    const { id } = req.params;
    const stream = await getFile(id);
    stream.on('data', (data) => res.write(data));
    stream.on('end', () => res.status(200).send());
})

export const post = asyncHandler(async function (req: any, res: any) {
    const file = req.file;
    if (!file) return res.json({ success: false, message: "A file is not attached." });
    const id = await saveFile(file.buffer);
    return res.json({ success: true, data: id });
})