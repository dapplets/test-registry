import { asyncHandler } from "../common/helpers";
import { createPresignedPost } from '../services/s3';

export const post = asyncHandler(async function (req: any, res: any) {
    const { id } = req.body;
    if (!id) throw new Error("id is required");
    const presignedPolicy = await createPresignedPost(id);
    return res.json({ success: true, data: presignedPolicy });
})