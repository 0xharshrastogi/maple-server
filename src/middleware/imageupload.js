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

export default upload;
