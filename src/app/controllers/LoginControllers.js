/* 
=============================================================================
CONTROLLER DE LOGIN / AUTENTICAÇÃO (LoginControllers.js)
=============================================================================
Padrão da arquitetura MVC:
- store = Autentica o usuário (valida formato de e-mail/senha, verifica se o
          usuário existe, compara a senha criptografada com o bcrypt e gera
          o token JWT de acesso)
=============================================================================
*/

import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import * as Yup from 'yup';
import auth from '../../config/auth.js';
import User from '../models/User.js';

class LoginControllers {
	async store(req, res) {
		const schema = Yup.object({
			email: Yup.string().required().email(),
			password: Yup.string().min(6).required(),
		});

		const isValid = await schema.isValid(req.body, { strict: true });

		const emailOfpasswordError = () => {
			return res.status(400).json({ error: 'E-mail ou senha incorretos' });
		};

		if (!isValid) {
			return emailOfpasswordError();
		}

		const { email, password } = req.body;

		const existUser = await User.findOne({
			where: {
				email,
			},
		});

		if (!existUser) {
			return emailOfpasswordError();
		}

		const corretPassword = await bcrypt.compare(
			password,
			existUser.password_hash,
		);

		if (!corretPassword) {
			return emailOfpasswordError();
		}

		const token = JWT.sign(
			{ id: existUser.id, admin: existUser.admin, name: existUser.name },
			auth.secret,
			{
				expiresIn: auth.expiresIn,
			},
		);

		return res.status(200).json({
			id: existUser.id,
			name: existUser.name,
			email: existUser.email,
			admin: existUser.admin,
			token,
		});
	}
}

export default new LoginControllers();
