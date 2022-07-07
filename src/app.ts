import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
app.set('cache', cache); 

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = (err.name == "AuthError") ? 401 : 400;
    return res.status(status).json({
        success: false,
        message: err.message ? err.message : err
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not found"
    });
});

export { app }