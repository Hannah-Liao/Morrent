import multer, { MulterError } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from '../configs/cloudinary.js';

const multerConf = multer();

const upload = multerConf.array('photos', 4);

const filesUpload = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof MulterError) {
        return res.status(400).json({
          status: 400,
          message: err.code,
        });
      }

      if (req.files.length < 1) {
        return res.json({
          status: 400,
          message: 'No files uploaded',
        });
      }

      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
        )
      );

      const uploadResults = await Promise.all(uploadPromises);

      const filteredResultDataArray = uploadResults.map(
        ({ api_key, url, ...rest }) => rest
      );

      return res.json({
        status: 200,
        message: 'Files uploaded successfully',
        data: filteredResultDataArray,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message.toString(),
    });
  }
};

export default filesUpload;
