import { Router } from "express";
import * as home from "../controllers/home";
import * as accounts from "../controllers/accounts";
import * as registry from "../controllers/registry";
import * as storage from "../controllers/storage";
import multer from "multer";

const upload = multer();
const router = Router();

router.get('/', home.index);

router.get('/accounts', accounts.index);
router.post('/accounts/:name', accounts.create);
router.delete('/accounts/:name', accounts.del);

router.get('/:account/registry/get-versions', registry.getVersions);
router.get('/:account/registry/resolve-to-uri', registry.resolveToUri);
router.get('/:account/registry/get-features', registry.getFeatures);
router.post('/:account/registry/add-module', registry.addModule);
router.post('/:account/registry/remove-module', registry.removeModule);
router.post('/:account/registry/add-site-binding', registry.addSiteBinding);
router.post('/:account/registry/remove-site-binding', registry.removeSiteBinding);

router.get('/:account/storage/:id', storage.getById);
router.post('/:account/storage/', upload.single('file'), storage.post);
router.delete('/:account/storage/:id', storage.del);

export default router;