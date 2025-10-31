import e from 'express';
import { uploadFile } from '../controller/upload.controller.js';
import storage from '../middleware/fileHandler.middleware.js';

const router = e.Router();

router.post('/upload', storage.single('file'), uploadFile);

export default router;