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
import AddCategoryControllers from './app/controllers/AddCategoryControllers.js';
import AddProdutsControllers from './app/controllers/AddProdutsControllers.js';
import LoginControllers from './app/controllers/LoginControllers.js';
import UserControllers from './app/controllers/userControllers.js';
import multerConfig from './config/multer.cjs';
import adminMidllewares from './middlewares/admin.js';
import authMidllewares from './middlewares/auth.js';

const uploads = multer(multerConfig);
const router = new Router();
//LOGIN
router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);
//SPA
router.use(authMidllewares);
router.get('/listCategories', AddCategoryControllers.index);
router.get('/listProducts', AddProdutsControllers.index);
//Admin
router.use(adminMidllewares);
router.post('/AddCategories', AddCategoryControllers.store);
router.post(
	'/AddProducts',
	uploads.single(`file`),
	AddProdutsControllers.store,
);

export default router;
