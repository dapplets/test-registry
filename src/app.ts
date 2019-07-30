import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { DATA_PATH } from "./common/constants";
import routes from "./routes";

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}
if (!fs.existsSync(DATA_PATH + '/storage')) {
    fs.mkdirSync(DATA_PATH + '/storage');
}
if (!fs.existsSync(DATA_PATH + '/accounts')) {
    fs.mkdirSync(DATA_PATH + '/accounts');
}

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', routes);

app.use((err: any, req: any, res: any, next: any) => {
    const status = (err.name == "AuthError") ? 401 : 400;
    res.status(status).json({
        success: false,
        message: err.message
    });
});

export { app }