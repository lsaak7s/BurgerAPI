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
import CategoryControllers from './app/controllers/CategoryControllers.js';
import LoginControllers from './app/controllers/LoginControllers.js';
import PedidosControllers from './app/controllers/PedidosControllers.js';
import ProdutsControllers from './app/controllers/ProdutsControllers.js';
import UserControllers from './app/controllers/UserControllers.js';
import adminMidllewares from './app/middlewares/admin.js';
import authMidllewares from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';


const uploads = multer(multerConfig);
const router = new Router();
//init
router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);
//Users
router.use(authMidllewares);
router.get('/listCategories', CategoryControllers.index);
router.get('/listProducts', ProdutsControllers.index);
router.post('/Pedidos', PedidosControllers.store);
router.put('/Pedidos/:id', PedidosControllers.update);
//Admin
router.use(adminMidllewares);
router.post('/Categories', uploads.single('file'), CategoryControllers.store);
router.put(
	'/Categories/:id',
	uploads.single('file'),
	CategoryControllers.update,
);
router.post('/Products', uploads.single('file'), ProdutsControllers.store);
router.put('/Products/:id', uploads.single('file'), ProdutsControllers.update);
router.get('/Pedidos', PedidosControllers.index);

export default router;
