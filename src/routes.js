import { Router } from 'express';
import User from './app/models/user.js';
const router = new Router();

router.get('/', async (req, res) => {
	const user = {
		name: 'isaacAlovues',
		email: 'isaac@2e1xemplo.com',
		password_hash: 'isaac8Alves',
		admin: false,
	};
	try {
		await User.create(user);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
