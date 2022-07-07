import { getAnnouncements } from "../services/announcements";
import { asyncHandler } from "../common/helpers";

export const get = asyncHandler(async function (req: any, res: any) {
    let announcements;
    const cache = req.app.get('cache');

    if (cache.has('announcements')) {
        announcements = cache.get('announcements');
    } else {
        announcements = await getAnnouncements();
        cache.set('announcements', announcements);
    }

    res.json({ success: true, data: announcements });
})