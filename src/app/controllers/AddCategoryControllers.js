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
import * as Yup from 'yup';
import Category from '../models/category.ts';

class Categories {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}

		const { name } = req.body;
		const existingCategory = await Category.findOne({
			where: { name },
		});

		if (existingCategory) {
			return res.status(400).json({ error: 'Categoria já existe' });
		}

		try {
			const newCategories = await Category.create({
				name,
			});
			return res.status(201).json(newCategories);
		} catch (error) {
			return res.status(500).json({ error: error.message || error });
		}
	}
	async index(req, res) {
		console.log(req.userid);
		const Categories = await Category.findAll();
		return res.status(200).json(Categories);
	}
}

export default new Categories();
