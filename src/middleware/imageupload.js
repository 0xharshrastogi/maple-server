import multer from 'multer';
import path from 'path';

const IDENTITY_IMAGE_PATH = path.join(path.resolve(), 'public/uploads/identity');
const extractExtension = (filename) => filename.split('/')[1];
const accept = {
  IMAGE: (mimetype) => ['image/png', 'image/jpeg'].includes(mimetype),
};

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const { userID } = req.params;
      const filename = `${userID}.${extractExtension(file.mimetype)}`;
      cb(null, filename);
    },

    destination: IDENTITY_IMAGE_PATH,
  }),

  fileFilter: (req, file, cb) => {
    if (accept['IMAGE'](file.mimetype)) return cb(null, true);
    return cb(null, false);
  },
});

export const fileupload = multer({
  storage: multer.diskStorage({
    // destination: path.join(path.resolve(), '/public/uploads/study-resource'),
    filename: (req, file, cb) => {
      const { classID } = req.params;
      const filename = `${classID}-${new Date().toJSON().slice(0, 10).replaceAll('-', '')}-${
        file.originalname
      }`;
      const error = null;

      cb(error, filename);
    },
    destination: (req, file, cb) => {
      const des = path.join(path.resolve(), '/public/uploads/study-resource');
      cb(null, des);
    },
  }),
});

export default upload;
