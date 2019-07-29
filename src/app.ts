import express from "express";
import bodyParser from "body-parser";
import modules from "./modules";
import accounts from "./accounts";
import fs from "fs";
import { DATA_PATH } from "./constants";

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var router = express.Router();

router.use('/modules', modules); 
router.use('/accounts', accounts); 

app.use('/api', router);

// main page
app.get('/', function (req: any, res: any) {
    res.json({
        success: true,
        message: "Hello! I'm Test Dapplet Registry. More information is here: https://github.com/dapplets/dapplet-registry"
    });
}); 

export { app }