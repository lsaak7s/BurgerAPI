/* controles
Padrao da aquitetura MVC
So pode aver apenas 1 de cada
store = cria dados
index = lista todos os usuarios
show = lista um dado
update = atualiza um dado
delete = remove um dado
*/
//SE PRECISAMOS BUSCAR QUALQUER INFORMAÇÃO DO BANCO DE DADOS IREMOS NOS REFERENCIA NA MODELS
//Sempre temos que deixar tudo bem documetado
//SEMPRE TENHA CERTEZA
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
			return res.status(400).json({ error: 'errou passeiro' });
		};
		if (!isValid) {
			emailOfpasswordError();
		}

		const { email, password } = req.body;

		const existUser = await User.findOne({
			where: {
				email,
			},
		});
		if (!existUser) {
			emailOfpasswordError();
		}
		const corretPassword = await bcrypt.compare(
			password,
			existUser.password_hash,
		);
		if (!corretPassword) {
			return res.status(400).json({ error: 'errou passeiro' });
		}

		//Aqui estamos gerando o token
		const token = JWT.sign({ id: existUser.id }, auth.secret, {
			expiresIn: auth.expiresIn,
		});

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
