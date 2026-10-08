import JWT from 'jsonwebtoken';
import authConfig from './../config/auth.js';

const authMidllewares = (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ Error: 'Cade o token tio' });
	}

	const token = authToken.split(' ')[1];

	try {
		JWT.verify(token, authConfig.secret, (error, decoded) => {
			if (error) {
				throw Error();
			}
			req.userid = decoded.id;
		});
	} catch (_error) {
		return res.status(401).json({ Error: 'invalido o token tio' });
	}
	return next();
};

export default authMidllewares;
