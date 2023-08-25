import { v2 as cloudinary } from 'cloudinary';

const filesUpload = async (req, res) => {
  try {
    if (req.files.length < 1) {
      return res.json({
        status: 400,
        message: 'No files uploaded',
      });
    }
    const files = req.files.map((file) => {
      return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });

    return res.json({
      status: 200,
      message: 'Files uploaded successfully',
      data: filteredResultDataArray,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message.toString(),
    });
  }
};

export default filesUpload;
