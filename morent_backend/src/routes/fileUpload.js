import express from 'express';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post('/upload', upload.array('photos', 4), function (req, res, next) {
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  let response = '<a href="/">Home</a><br>';
  response += 'Files uploaded successfully.<br>';
  for (var i = 0; i < req.files.length; i++) {
    response += `<img src="${req.files[i].path}" /><br>`;
  }

  return res.send(response);
});

export default router;
