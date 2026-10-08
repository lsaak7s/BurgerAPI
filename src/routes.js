/* controles
Padrao da aquitetura MVC
So pode aver apenas 1 de cada
store = cria dados
index = lista todos os dado
show = lista um dado
update = atualiza um dado
delete = remove um dado
*/
//SEMPRE TENHA CERTEZA
import { Router } from 'express';
import multer from 'multer';

import AddProdutsControllers from './app/controllers/AddProdutsControllers.js';
import LoginControllers from './app/controllers/LoginControllers.js';
import UserControllers from './app/controllers/UserControllers.js';
import multerConfig from './config/multer.cjs';
import authMidllewares from './middlewares/auth.js';

const uploads = multer(multerConfig);
const router = new Router();

router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);
router.use(authMidllewares);
router.post(
	'/AddProducts',
	authMidllewares,
	uploads.single(`file`),
	AddProdutsControllers.store,
);
router.get('/AddProducts', authMidllewares, AddProdutsControllers.index);

export default router;
