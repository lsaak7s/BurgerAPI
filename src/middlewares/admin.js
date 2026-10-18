/* 
=============================================================================
MIDDLEWARE DE AUTORIZAÇÃO DE ADMINISTRADOR (admin.js)
=============================================================================
Padrão da arquitetura / Middlewares:
- Intercepta requisições destinadas a rotas restritas a administradores.
- Valida a flag "req.userIsAdmin" (geralmente injetada pelo middleware de autenticação prévio).
- Bloqueia com status 401 (Unauthorized) caso o usuário não tenha privilégios administrativos.
- Libera a execução para o próximo middleware ou controller caso seja administrador.
=============================================================================
*/

const adminMidllewares = (req, res, next) => {
	const adminToken = req.userIsAdmin;

	if (!adminToken) {
		return res.status(401).json({ error: 'Não e comandante filho' });
	}

	return next();
};

export default adminMidllewares;