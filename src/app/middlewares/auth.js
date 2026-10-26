/* 
=============================================================================
MIDDLEWARE DE AUTENTICAÇÃO JWT (auth.js)
=============================================================================
Padrão da arquitetura / Middlewares:
- Intercepta requisições para verificar se o usuário está autenticado.
- Extrai o token JWT enviado no cabeçalho "Authorization" (padrão Bearer).
- Valida o token com a chave secreta (authConfig.secret).
- Injeta no objeto da requisição o id do usuário (req.userid) e o status de
  administrador (req.userIsAdmin) para uso nos controllers e middlewares seguintes.
- Retorna status 401 caso o token não seja enviado ou seja inválido/expirado.
=============================================================================
*/

import JWT from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMidllewares = (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ error: 'Token não encontrado' });
	}

	const token = authToken.split(' ')[1];

	try {
		const decoded = JWT.verify(token, authConfig.secret);

		req.userid = decoded.id;
		req.username = decoded.name;
		req.userIsAdmin = decoded.admin;

		return next();
	} catch (error) {
		return res
			.status(401)
			.json({ error: 'invalido o token tio', detalhe: error.message });
	}
};

export default authMidllewares;
