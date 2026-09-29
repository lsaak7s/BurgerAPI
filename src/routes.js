//SEMPRE TENHA CERTEZA
import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';

const router = new Router();

router.post('/users', UserControllers.store);

export default router;
