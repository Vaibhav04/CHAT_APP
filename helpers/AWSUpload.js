const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const secret = require('../secret/secretFile');

AWS.config.update({
    accessKeyId: secret.aws.accessKeyId,
    secretAccessKey: secret.aws.secretAccessKey,
    region: 'ap-south-1'
});

const S3 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: S3,
        bucket: 'chatapp01',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, file.originalname);
        }
    }),

    rename: function(fieldName, fileName) {
        return fileName.replace(/\W+/g, '_').toLowerCase();
    }
});

exports.Upload = upload;