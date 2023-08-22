import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const uploads = multer({
  limits: {
    fieldSize: 2097152,
    files: 4,
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', uploads.array('photos', 4), async (req, res) => {
  try {
    if (req.files.length < 1) {
      return res.json({
        status: 400,
        message: 'No files uploaded',
      });
    }

    let files = [];
    for (const file of req.files) {
      files.push({
        file: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      });
    }

    const uploadResults = await Promise.all(
      files.map((file) => cloudinary.uploader.upload(file.file))
    );
    res
      .json({
        status: 200,
        message: 'Files uploaded successfully',
        data: uploadResults,
      })
      .end();
  } catch (error) {
    return res
      .json({
        status: 500,
        message: error.message,
      })
      .end();
  }
});

export default router;
