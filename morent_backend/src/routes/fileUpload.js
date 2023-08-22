import express from 'express';

import filesUpload from '../controllers/upload.js';

const router = express.Router();

router.post('/upload', filesUpload);

export default router;
