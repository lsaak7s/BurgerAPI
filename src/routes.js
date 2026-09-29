import { Router } from 'express';
import Usercontrollers from './app/controllers/userControllers.js';

const router = new Router();

router.get('/', Usercontrollers.store);

export default router;
