import JWT, { decode } from 'jsonwebtoken';
import authConfig from './../config/auth.js';

const authMidllewares = (req, res, _next) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ Error: 'Cade o token tio' });
	}

	const token = authToken.split(' ')[1];

	try {
		JWT.verify(token, authConfig.secret, (error, decoded) => {
			console.log(decoded);
		});
	} catch (error) {}
};

export default authMidllewares;
