import JWT from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMidllewares = (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ error: 'Token não encontrado' });
	}

	const token = authToken.split(' ')[1];

	// === COLE ESTES LOGS AQUI ===
	//console.log('🔑 [MIDDLEWARE] SECRET USADA:', authConfig.secret);
	//console.log('🎟️ [MIDDLEWARE] TOKEN RECEBIDO:', token);
	// =============================

	try {
		JWT.verify(token, authConfig.secret, (error, decoded) => {
			if (error) {
				throw Error();
			}
			console.log(decoded)
			req.userid = decoded.id;
			req.userIsAdmin = decoded.admin;
		});
	} catch (error) {
		console.log('❌ ERRO NO VERIFY:', error.message);
		return res
			.status(401)
			.json({ error: 'invalido o token tio', detalhe: error.message });
	}
	return next();
};

export default authMidllewares;
