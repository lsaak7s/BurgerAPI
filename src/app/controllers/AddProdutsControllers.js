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
// Importa a biblioteca Yup, usada para validar dados enviados na requisição
import * as Yup from 'yup';

// Importa o modelo Category (categorias) para usar em buscas e relações
import Category from '../models/category.js';

// Importa o modelo Product (produtos) para criar e listar produtos
import Product from '../models/produts.js';
import { where } from 'sequelize';

// Classe responsável pelas rotas de produtos
class AddProdutsControllers {
	// Método para criar um novo produto (rota POST /products)
	async store(req, res) {
		// Define as regras de validação: os campos precisam existir e ter os tipos corretos
		const schema = Yup.object({
			name: Yup.string().required(), // nome tem que ser texto e é obrigatório
			price: Yup.number().required(), // preço tem que ser número e é obrigatório
			category_id: Yup.number().required(), // id da categoria tem que ser número e é obrigatório
			offer: Yup.boolean(),
		});

		// Tenta validar os dados enviados
		try {
			// Se algum campo estiver errado, abortEarly: false faz retornar todos os erros de uma vez
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			// Se a validação falhou, devolve erro 400 (requisição inválida) com a lista de erros
			return res.status(400).json({ error: error.errors });
		}

		// Agora que os dados passaram na validação, tenta criar o produto
		try {
			// Extrai os campos do corpo da requisição
			const { name, price, category_id, offer } = req.body;

			// Pega o nome do arquivo enviado (a imagem do produto)
			// O multer (ou similar) coloca o arquivo em req.file
			const { filename } = req.file;

			// Cria o produto no banco de dados
			const newProducts = await Product.create({
				name,
				price,
				category_id,
				path: filename, // salva o caminho/imagem do produto
				offer,
			});

			// Se tudo deu certo, retorna o produto recém-criado com status 201 (criado)
			return res.status(201).json(newProducts);
		} catch (error) {
			console.error('❌ ERRO AO CRIAR PRODUTO:', error); // 👈 ADICIONE ESSA LINHA
			return res.status(500).json({ error: error.message });
		}
	}
	async update(req, res) {
		// Define as regras de validação: os campos precisam existir e ter os tipos corretos
		const schema = Yup.object({
			name: Yup.string(), // nome tem que ser texto e é obrigatório
			price: Yup.number(), // preço tem que ser número e é obrigatório
			category_id: Yup.number(), // id da categoria tem que ser número e é obrigatório
			offer: Yup.boolean(),
		});

		// Tenta validar os dados enviados
		try {
			// Se algum campo estiver errado, abortEarly: false faz retornar todos os erros de uma vez
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			// Se a validação falhou, devolve erro 400 (requisição inválida) com a lista de erros
			return res.status(400).json({ error: error.errors });
		}

		// Agora que os dados passaram na validação, tenta criar o produto
		try {
			// Extrai os campos do corpo da requisição
			const { name, price, category_id, offer } = req.body;
			const { id } = req.params;
			// Pega o nome do arquivo enviado (a imagem do produto)
			// O multer (ou similar) coloca o arquivo em req.file
			let path;
			if (req.filename) {
				const { filename } = req.file;
				path = filename;
			}

			// Cria o produto no banco de dados
			await Product.update(
				{
					name,
					price,
					category_id,
					path, // salva o caminho/imagem do produto
					offer,
				},
				{
					where: {
						id,
					},
				},
			);

			// Se tudo deu certo, retorna o produto recém-criado com status 201 (criado)
			return res.status(201).json('products atualizado com sucesso');
		} catch (error) {
			console.error('❌ ERRO AO CRIAR PRODUTO:', error); // 👈 ADICIONE ESSA LINHA
			return res.status(500).json({ error: error.message });
		}
	}

	// Método para listar todos os produtos (rota GET /products)
	async index(_req, res) {
		// Busca todos os produtos e também traz a categoria relacionada a cada um
		const products = await Product.findAll({
			include: {
				model: Category, // junta com a tabela de categorias
				as: 'category', // o apelido do relacionamento definido no modelo
				attributes: ['id', 'name'], // só busca os campos id e name da categoria
			},
		});

		// Retorna a lista de produtos com status 200 (sucesso)
		return res.status(200).json(products);
	}
}

// Exporta uma instância única da classe para ser usada nas rotas
export default new AddProdutsControllers();
