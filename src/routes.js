import { Router } from 'express';
import User from './app/models/User.js';
import { v4 } from 'uuid';
const router = new Router();

router.get('/', async (req, res) => {
	const user = {
		id: v4(),

		name: 'isaac Alves',
		email: 'isaac@exemplo.com',
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
