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
import * as Yup from 'yup';

class LoginControllers {
	async store(req, res) {
		const schema = Yup.object({
			email: Yup.string().required().email(),
			password: Yup.string().required(),
		});
		const isValid = await schema.isValid(req.body, { strict: true });

		if (!isValid) {
			return res.status(400).json({ error: 'errou passeiro' });
		}
		const { email, password } = req.body;
		
		return res.status(200).json({ ok: true });
	}
}

export default new LoginControllers();
