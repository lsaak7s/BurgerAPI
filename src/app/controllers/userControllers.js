/* 
=============================================================================
CONTROLLER DE USUÁRIOS (Usercontrollers.js)
=============================================================================
Padrão da arquitetura MVC:
- store = Cadastra um novo usuário (valida os campos com Yup, verifica se o
          e-mail já está cadastrado, criptografa a senha com bcrypt e salva
          o registro no banco de dados)
=============================================================================
*/

import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../models/User.js';

class Usercontrollers {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
			email: Yup.string().required().email(),
			password: Yup.string().required().min(6),
			admin: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false, strict: true });
		} catch (error) {
			return res.status(400).json({ err: error.errors });
		}

		try {
			const { name, email, password, admin } = req.body;

			const existUser = await User.findOne({
				where: {
					email,
				},
			});

			if (existUser) {
				return res.status(400).json({
					message:
						'Caro Usuário, este e-mail já se encontra em uso. Se possível, utilize outro e-mail.',
				});
			}

			const password_hash = await bcrypt.hash(password, 9);

			const user = await User.create({
				name,
				email,
				password_hash,
				admin,
			});

			return res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email,
				admin: user.admin,
			});
		} catch (error) {
			console.error(error);

			return res.status(400).json({
				error: 'Dados inválidos.',
			});
		}
	}
}

export default new Usercontrollers();