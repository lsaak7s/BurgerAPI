/* 
=============================================================================
CONTROLLER DE PRODUTOS (AddProdutsControllers.js)
=============================================================================
Padrão da arquitetura MVC:
- store  = Cria um novo produto (valida dados, imagem e salva no banco de dados)
- update = Atualiza os dados de um produto existente através do ID (req.params)
- index  = Lista todos os produtos cadastrados, incluindo a categoria de cada um
=============================================================================
*/
import * as Yup from 'yup';

class PedidosControllers {
	async store(req, res) {
		const schema = Yup.object({
			products: Yup.array().of(
				Yup.object({
					id: Yup.number().required(),
					quantity: Yup.number().required(),
				}),
			),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false, strict: true });
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}
		const { userid, username } = req;
		const { products } = req.body;
		const order = {
			user: {
				id: userid,
				name: username,
			},
			products,
		};
		return res.status(201).json(order);
	}
}

export default new PedidosControllers();
