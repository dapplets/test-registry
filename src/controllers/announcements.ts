import { getAnnouncements } from "../services/announcements";
import { asyncHandler } from "../common/helpers";

export const get = asyncHandler(async function (req: any, res: any) {
    const announcements = await getAnnouncements();
    res.json({ success: true, data: announcements });
})