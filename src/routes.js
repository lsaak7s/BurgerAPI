//SEMPRE TENHA CERTEZA
import { Router } from 'express';
import LoginControllers from './app/controllers/LoginControllers.js';
import UserControllers from './app/controllers/UserControllers.js';

const router = new Router();

router.post('/users', UserControllers.store);
router.post('/Login', LoginControllers.store);

export default router;
