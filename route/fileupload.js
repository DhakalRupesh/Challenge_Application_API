const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "./public/uploadsfile",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const FileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|docx|xlsx)$/)) {
        return cb(new Error("You can upload only files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: FileFilter
})

const uploadRouter = express.Router();

uploadRouter.route('/')
    .post(upload.single('file'), (req, res) => {
        res.json(req.file);
    });

module.exports = uploadRouter;