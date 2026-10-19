/* 
=============================================================================
ROTEADOR DA APLICAÇÃO (src/routes.js)
=============================================================================
Padrão da arquitetura / Rotas da API:
- Centraliza e organiza todos os endpoints e métodos HTTP (POST, GET, PUT) do sistema.
- Rotas Públicas: Criação de usuário (/users) e Login (/Login).
- Barreira 1 (authMidllewares): Exige token JWT válido para consultar categorias
  (/listCategories) e produtos (/listProducts).
- Barreira 2 (adminMidllewares): Exige privilégios de administrador para criar categorias
  (/AddCategories) e criar ou atualizar produtos (/AddProducts) com suporte a upload
  de imagem via Multer.
=============================================================================
*/

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
//init
router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);
//Users
router.use(authMidllewares);
router.get('/listCategories', AddCategoryControllers.index);
router.get('/listProducts', AddProdutsControllers.index);
//Admin
router.use(adminMidllewares);
router.post(
	'/AddCategories',
	uploads.single('file'),
	AddCategoryControllers.store,
);
router.post(
	'/AddProducts',
	uploads.single('file'),
	AddProdutsControllers.store,
);
router.put(
	'/AddProducts/:id',
	uploads.single('file'),
	AddProdutsControllers.update,
);

export default router;
