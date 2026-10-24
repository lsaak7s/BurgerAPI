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
import Pedidos from '../schemas/Pedidos.js';

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
				const quantity =
					products.find((p) => p.id === product.id).quantity || 0;
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
			const newPedido = await Pedidos.create(pedido);
			return res.status(201).json(newPedido);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async update(req, res) {
		const schema = Yup.object({
			status: Yup.string().required(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false, strict: true });
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}
		const { status } = req.body;
		const { id } = req.params;

		try {
			await Pedidos.updateOne({ _id: id }, { status });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
		return res.status(200).json({ message: 'status atualizado' });
	}
	async index(_req, res) {
		const Pedido = Pedidos.find();
		return res.status(200).json(Pedido);
	}
}

export default new PedidosControllers();
