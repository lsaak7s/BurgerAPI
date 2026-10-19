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
import Category from '../models/category.js';
import Product from '../models/product.js';

class AddProdutsControllers {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}

		try {
			const { name, price, category_id, offer } = req.body;
			const { filename } = req.file;

			const newProducts = await Product.create({
				name,
				price,
				category_id,
				path: filename,
				offer,
			});

			return res.status(201).json(newProducts);
		} catch (error) {
			console.error('❌ ERRO AO CRIAR PRODUTO:', error);
			return res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			return res.status(400).json({ error: error.errors });
		}

		try {
			const { name, price, category_id, offer } = req.body;
			const { id } = req.params;

			let path;
			if (req.file) {
				const { filename } = req.file;
				path = filename;
			}

			await Product.update(
				{
					name,
					price,
					category_id,
					path,
					offer,
				},
				{
					where: {
						id,
					},
				},
			);

			return res.status(200).json('Produto atualizado com sucesso');
		} catch (error) {
			console.error('❌ ERRO AO ATUALIZAR PRODUTO:', error);
			return res.status(500).json({ error: error.message });
		}
	}

	async index(_req, res) {
		const products = await Product.findAll({
			include: {
				model: Category,
				as: 'category',
				attributes: ['id', 'name'],
			},
		});

		return res.status(200).json(products);
	}
}

export default new AddProdutsControllers();
