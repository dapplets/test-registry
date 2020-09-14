import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { DATA_PATH, DATA_ACCOUNTS_PATH, DATA_STORAGE_PATH } from "./common/constants";
import routes from "./routes";
import cors from "cors";

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}
if (!fs.existsSync(DATA_STORAGE_PATH)) {
    fs.mkdirSync(DATA_STORAGE_PATH);
}
if (!fs.existsSync(DATA_ACCOUNTS_PATH)) {
    fs.mkdirSync(DATA_ACCOUNTS_PATH);
}

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.use((err: any, req: any, res: any, next: any) => {
    const status = (err.name == "AuthError") ? 401 : 400;
    res.status(status).json({
        success: false,
        message: err.message ? err.message : err
    });
});

export { app }