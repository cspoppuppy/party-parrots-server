if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuid } = require('uuid');
const { application } = require('express');

// import { v4 as uuid } from 'uuid';

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

let upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.AWS_S3_BUCKET,
		acl: 'public-read',
		metadata: (req, file, cb) => {
			cb(null, { fileName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, req.s3Key);
		},
	}),
});

const singleFileUpload = upload.single('image');

const uploadToS3 = (req, res) => {
	console.log('uploading to S3...');
	req.s3Key = uuid();
	let downloadUrl = `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${req.s3Key}`;
	return new Promise((resolve, reject) => {
		return singleFileUpload(req, res, (error) => {
			if (error) return reject(error);
			return resolve(downloadUrl);
		});
	});
};

router.post('/', async (req, res) => {
	console.log(req.body);
	uploadToS3(req, res)
		.then((downloadUrl) => {
			console.log(downloadUrl);
			return res.status(200).send({ downloadUrl });
		})
		.catch((error) => {
			return res.status(400).send({ error });
		});
});

// router.post('/', upload.single('image'), async (req, res) => {
// 	try {
// 		const file = req.file;
// 		console.log(file.location);
// 		if (file.location) {
// 			res.status(200).send({ downloadUrl: file.location });
// 		} else {
// 			res.status(500).send({ error: 'Something went wrong' });
// 		}
// 	} catch (error) {
// 		res.status(500).send({ error });
// 	}
// });

router.get('/', (req, res) => {
	console.log('key: ', aws.config.credentials.secretAccessKey);
	res.send('image upload');
});

module.exports = router;
