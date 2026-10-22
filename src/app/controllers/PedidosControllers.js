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
import Category from '../models/Category.js';
import Product from '../models/Product.js';

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
		const idProducts = products.map((product) => product.id);
		const fidProducts = await Product.findAll({
			where: {
				id: idProducts,
			},
			include: {
				model: Category,
				as: 'category',
				attributes: ['name'],
			},
		});
		const newProducts = fidProducts.map((product) => {
			const newProduct = {
				id: product.id,
				category: product.category.name,
				name: product.name,
				price: product.price,
				url: product.url,
				

			}
			return newProduct
		});
		const order = {
			user: {
				id: userid,
				name: username,
			},
			products: newProducts,
		};
		return res.status(201).json(order);
	}
}

export default new PedidosControllers();
