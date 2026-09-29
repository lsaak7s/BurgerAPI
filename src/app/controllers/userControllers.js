/* controles
Padrao da aquitetura MVC
So pode aver apenas 1 de cada
store = cria dados
index = lista todos os usuarios
show = lista um dado
update = atualiza um dado
delete = remove um dado
*/
//Sempre temos que deixar tudo bem documetado
//SEMPRE TENHA CERTEZA
import User from '../models/User.js';

class Usercontrollers {
	async store(req, res) {
		try {
			const { name, email, password_hash,admin } = req.body;

			const existUser = await User.findOne({
				where: {
					email,
				},
			});
			if (existUser) {
				return res.status(400).json({
					message:
						'Caro Usuario este email ja se encontra em uso, se possivel utilize outro email',
				});
			}

			const user = await User.create({
				name,
				email,
				password_hash,
				admin,
			});

			return res.status(201).json({
				name: user.name,
				email: user.email,
				password_hash: user.password_hash,
				admin: user.admin,
			});
		} catch (error) {
			console.error(error);

			return res.status(500).json({
				error: 'Erro ao criar usuário.',
			});
		}
	}
}

export default new Usercontrollers();
