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

class AddProdutsControllers {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category: Yup.string().required(),
		});
		try {
			schema.validateSync(req.body, { abortEarly: false});
		} catch (error) {
			return res.status(400).json({error: error.errors});
		}
		return res.status(201).json({ ok: true });
	}
}

export default new AddProdutsControllers();
