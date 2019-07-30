import fs from "fs";
import { RequestHandler } from "express-serve-static-core";

export const getDirectories = (source: string): string[] => fs.readdirSync(source, {
    withFileTypes: true
}).reduce((a: any, c) => {
    c.isDirectory() && a.push(c.name)
    return a;
}, []);

export const asyncHandler = (fn: RequestHandler) => 
    (req: any, res: any, next: any) => 
        Promise.resolve(fn(req, res, next)).catch(next);
