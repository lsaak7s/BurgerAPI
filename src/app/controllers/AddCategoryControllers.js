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
// Importa a biblioteca Yup, que serve para validar dados (como nome, email, etc.)
import * as Yup from 'yup';

// Importa o modelo Category, que representa a tabela "categories" no banco de dados
import Category from '../models/category.js';

// Define a classe Categories, que vai controlar as rotas relacionadas a categorias
class Categories {
	// Método responsável por criar uma nova categoria (usado no POST /categories)
	async store(req, res) {
		// Define o formato esperado para os dados enviados
		const schema = Yup.object({
			name: Yup.string().required(), // O campo "name" é obrigatório e precisa ser texto
		});

		// Tenta validar os dados enviados pelo usuário
		try {
			// Se falhar, o abortEarly: false faz com que ele retorne todos os erros de uma vez
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			// Se a validação falhar, devolve erro 400 com a lista de erros
			return res.status(400).json({ error: error.errors });
		}

		// Pega apenas o campo "name" do corpo da requisição
		const { name } = req.body;

		// Procura no banco se já existe uma categoria com esse mesmo nome
		const existingCategory = await Category.findOne({
			where: { name },
		});

		// Se já existir, retorna erro 400 dizendo que a categoria já foi criada antes
		if (existingCategory) {
			return res.status(400).json({ error: 'Categoria já existe' });
		}

		// Tenta criar a nova categoria no banco
		try {
			const newCategories = await Category.create({
				name, // passa o nome recebido
			});

			// Se der certo, devolve a categoria criada com status 201 (criado com sucesso)
			return res.status(201).json(newCategories);
		} catch (error) {
			// Se der erro ao salvar no banco, retorna erro 500 (erro interno do servidor)
			return res.status(500).json({ error: error.message || error });
		}
	}

	// Método responsável por listar todas as categorias (usado no GET /categories)
	async index(_req, res) {
		// Esse console.log mostra o id do usuário autenticado (se você tiver algum middleware)
		// Ele pode ser útil pra debugar, mas não faz parte da lógica principal
		//console.log(req.userid);

		// Busca todas as categorias que existem no banco
		const Categories = await Category.findAll();

		// Retorna a lista de categorias com status 200 (sucesso)
		return res.status(200).json(Categories);
	}
}

// Exporta uma instância única da classe Categories
// Assim o app pode usar direto: Categories.store, Categories.index etc.
export default new Categories();
