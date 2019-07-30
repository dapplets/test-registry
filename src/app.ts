import express from "express";
import bodyParser from "body-parser";
import homeController from "./controllers/homeController";
import accountController from "./controllers/accountController";
import moduleController from "./controllers/moduleController";
import storageController from "./controllers/storageController";
import fs from "fs";
import { DATA_PATH } from "./common/constants";

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

var router = express.Router();

router.use('/accounts', accountController);
router.use('/modules', moduleController);
router.use('/storage', storageController);

app.use('/api', router);
app.use('/', homeController);

export { app }