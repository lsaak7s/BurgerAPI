//SEMPRE TENHA CERTEZA
import { Router } from 'express';
import multer from 'multer';
import AddProdutsControllers from './app/controllers/AddProdutsControllers.js';
import LoginControllers from './app/controllers/LoginControllers.js';
import UserControllers from './app/controllers/UserControllers.js';
import multerConfig from './config/multer.cjs';

const uploads = multer(multerConfig);
const router = new Router();

router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);
router.post(
	'/AddProducts',
	uploads.single(`file`),
	AddProdutsControllers.store,
);

export default router;
