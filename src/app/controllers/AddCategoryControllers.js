/* 
=============================================================================
CONTROLLER DE CATEGORIAS (AddCategoryControllers.js)
=============================================================================
Padrão da arquitetura MVC:
- store  = Cria uma nova categoria (valida se o nome já existe no banco)
- index  = Lista todas as categorias cadastradas
=============================================================================
*/

import * as Yup from 'yup';
import Category from '../models/category.js';

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
		const { filename } = req.file;

		const existingCategory = await Category.findOne({
			where: { name },
		});

		if (existingCategory) {
			return res.status(400).json({ error: error.message });
		}

		try {
			const newCategories = await Category.create({
				name,
				path: filename,
			});

			return res.status(201).json(newCategories);
		} catch (error) {
			return res.status(500).json({ error: error.message || error });
		}
	}
	async update(req, res) {
		const { name } = req.body;
		const { id } = req.params;
		const schema = Yup.object({
			name: Yup.string(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
			const existingCategory = await Category.findOne({
				where: { name },
			});

			if (existingCategory) {
				return res.status(400).json({ Error: 'Categoria já foi atualizada' });
			}
		} catch (error) {
			return res.status(401).json({ Error: error.errors || error.message });
		}

		try {
			let path;
			if (!req.file) {
				const filename = req.file;
				path = filename;
			}

			await Category.update(
				{
					name,
					path,
				},
				{
					where: {
						id,
					},
				},
			);

			return res.status(201).json('Categoria atualizado com Sucesso');
		} catch (error) {
			return res.status(500).json({ Error: error.message || error });
		}
	}

	async index(_req, res) {
		const Categories = await Category.findAll();

		return res.status(200).json(Categories);
	}
}

export default new Categories();
