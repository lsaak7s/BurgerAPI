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
import User from '../models/user.js';

class Usercontrollers {
	async store(req, res) {
		const { name, email, password_hash, admin } = req.body;
		const user = await User.create({
			name,
			email,
			password_hash,
			admin,
		});
		try {
			await User.create(user);
			res.status(201).json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}
}
export default new Usercontrollers();
