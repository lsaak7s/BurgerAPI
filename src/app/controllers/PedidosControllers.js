/* 
=============================================================================
CONTROLLER DE PEDIDOS / PRODUTOS (PedidosControllers.js)
=============================================================================
Padrão da arquitetura MVC:
- store  = Cria um novo pedido/produto (valida dados, imagem e salva no banco de dados)
- update = Atualiza os dados de um registro existente através do ID (req.params)
- index  = Lista todos os registros existentes
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
		try {
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
				const quantity = products.find((p) => p.id === product.id).quantity || 0;
				const newProduct = {
					id: product.id,
					category: product.category.name,
					name: product.name,
					price: product.price,
					url: product.url,
					quantity,
				};
				return newProduct;
			});
			const pedido = {
				user: {
					id: userid,
					name: username,
				},
				products: newProducts,
				status: 'Pedido feito chefe',
			};
			return res.status(201).json(pedido);
		} catch (error) {
			res.status(400).json({ error: error.message})
		}
	}
}

export default new PedidosControllers();
