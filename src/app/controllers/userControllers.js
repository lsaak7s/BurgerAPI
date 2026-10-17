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
// Importa o bcrypt, usado para criptografar a senha do usuário de forma segura
import bcrypt from 'bcrypt';

// Importa a biblioteca Yup para fazer a validação dos dados recebidos
import * as Yup from 'yup';

// Importa o modelo User que representa a tabela de usuários no banco de dados
import User from '../models/User.js';

// Classe responsável pelo cadastro e gerenciamento de usuários
class Usercontrollers {
	// Método responsável por cadastrar/criar um novo usuário (usado no POST /users)
	async store(req, res) {
		// Define o esquema de validação: determina as regras para cada campo do formulário
		const schema = Yup.object({
			name: Yup.string().required(), // Nome deve ser texto e é obrigatório
			email: Yup.string().required().email(), // Email é texto, obrigatório e deve ser um email válido
			password: Yup.string().required().min(6), // Senha é texto, obrigatória e precisa ter no mínimo 6 caracteres
			admin: Yup.boolean(), // Campo admin deve ser um valor verdadeiro/falso (booleano)
		});

		// Tenta validar os dados recebidos na requisição (req.body)
		try {
			// validateSync roda a validação.
			// abortEarly: false mostra todos os erros encontrados de uma vez
			// strict: true não tenta converter os tipos dos dados automaticamente
			schema.validateSync(req.body, { abortEarly: false, strict: true });
		} catch (error) {
			// Se os dados não passarem na validação, retorna status 400 com a lista de erros
			return res.status(400).json({ err: error.errors });
		}

		// Tenta salvar o usuário no banco de dados
		try {
			// Extrai os campos enviados no corpo da requisição
			const { name, email, password, admin } = req.body;

			// Procura no banco se já existe um usuário cadastrado com este mesmo email
			const existUser = await User.findOne({
				where: {
					email,
				},
			});

			// Se o email já estiver cadastrado, interrompe a criação e avisa o cliente
			if (existUser) {
				return res.status(400).json({
					message:
						'Caro Usuario este email ja se encontra em uso, se possivel utilize outro email',
				});
			}

			// Criptografa a senha antes de salvar no banco (o número 9 representa a força/complexidade do hash)
			const password_hash = await bcrypt.hash(password, 9);

			// Cria e salva o novo usuário no banco de dados
			const user = await User.create({
				name,
				email,
				password_hash, // salva a senha já criptografada por segurança
				admin,
			});

			// Retorna status 201 (criado com sucesso) com os dados do usuário cadastrado
			return res.status(201).json({
				name: user.name,
				email: user.email,
				password_hash: user.password_hash,
				admin: user.admin,
			});
		} catch (error) {
			// Exibe o erro no console para ajudar no desenvolvimento/debug
			console.error(error);

			// Se der qualquer outro erro imprevisto ao salvar no banco, retorna erro 400
			return res.status(400).json({
				error: 'Dados inválidos.',
			});
		}
	}
}

// Exporta uma instância única do controlador de usuários
export default new Usercontrollers();
