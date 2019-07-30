import express from "express";

const router = express.Router();

// home page
router.get('/', function (req: any, res: any) {
    res.json({
        success: true,
        message: "Hello! I'm Test Dapplet Registry. More information is here: https://github.com/dapplets/dapplet-registry"
    });
}); 

export default router;