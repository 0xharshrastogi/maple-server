import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const { userID } = req.params;
    const filename = `${userID}-identityImage.${file.mimetype.slice(6)}`;
    cb(null, filename);
  },
});

const imageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const extractFileExtension = (filename) =>
  /\.[a-zA-Z0-9]+$/.test(filename) ? /\.[a-zA-Z0-9]+$/.exec(filename)[0] : '';

const destination = path.join(path.resolve(), 'public/uploads/identity');
fs.stat(destination).catch(() => fs.mkdir(destination, { recursive: true }));

const defaultOptions = {
  destination,
  accept: ['image/png', 'image/jpeg', 'image/jpg'],
};

function uploadImage(config) {
  const options = Object.assign({}, defaultOptions, config);

  if (!options.target) throw new Error('Target Required');

  const storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, options.destination);
    },

    filename: (req, file, cb) => {
      const { userID } = req.params;
      const filename = `${userID}${extractFileExtension(file.originalname)}`;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 1024000 },
    fileFilter: (req, file, cb) => {
      const canAllow = options.accept.includes(file.mimetype);
      console.log(file, canAllow);
      if (canAllow) return cb(null, canAllow);
      cb(new Error(`File Type Must Be: ${options.accept.join(', ')}`));
    },
  });

  return upload.single(options.target);
}

export default uploadImage;
