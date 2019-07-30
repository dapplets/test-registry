import fs from "fs";

export const getDirectories = (source: string): string[] => fs.readdirSync(source, {
    withFileTypes: true
}).reduce((a: any, c) => {
    c.isDirectory() && a.push(c.name)
    return a;
}, []);