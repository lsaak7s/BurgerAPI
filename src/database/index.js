//SEMPRE TENHA CERTEZA
// Importa a classe principal do Sequelize, que faz a conexão com o banco de dados
import { Sequelize } from 'sequelize';

// Importa as funções que configuram e inicializam cada um dos modelos (tabelas)
// Nota: Os nomes estão em JS (User.js), mas os imports vêm de 'produts.js' e 'User.js'
import { initCategory } from '../app/models/category.js';
import { initProduct } from '../app/models/produts.js';
import { initUser } from '../app/models/User.js';

// Importa as configurações de conexão (host, porta, usuário, senha, etc.)
import databaseConfig from '../config/database.cjs';

// Cria uma lista com todas as funções que precisam inicializar os modelos
// Isso facilita adicionar novos modelos no futuro: basta colocar aqui
const modelInitializers = [initUser, initProduct, initCategory];

// Classe responsável por gerenciar a conexão e os modelos do banco
class Database {
	// O construtor é chamado automaticamente quando o módulo é importado (no final do arquivo)
	constructor() {
		// Chama o método init() para começar a configurar tudo
		this.init();
	}

	// Método principal que configura a conexão e os relacionamentos
	init() {
		// 1. Cria a conexão com o banco de dados passando as configurações importadas
		this.connection = new Sequelize(databaseConfig);

		// 2. PEGA a lista de inicializadores e executa cada um deles
		// Cada função (initUser, etc.) vai configurar a tabela no banco e retornar o modelo
		const models = modelInitializers.map((initializeModel) =>
			initializeModel(this.connection),
		);

		// 3. Agora que os modelos existem, chamamos o método 'associate' de cada um
		// Isso é necessário para definir os relacionamentos (ex: User tem muitos Products)
		models.forEach((model) => {
			// Verifica se o modelo tem o método associate (segurança)
			if (model && typeof model.associate === 'function') {
				// Passa o objeto global de modelos do Sequelize
				// Assim, o Category consegue encontrar o Product pelo nome, por exemplo
				model.associate(this.connection.models);
			}
		});
	}
}

// Exporta uma instância ÚNICA da classe Database
// Por ser um "singleton", todo o app usa a mesma conexão inicializada
export default new Database();