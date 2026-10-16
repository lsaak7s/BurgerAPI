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
// Importa o bcrypt, usado para comparar senhas de forma segura (compara a senha digitada com a criptografada)
import bcrypt from 'bcrypt';

// Importa o jsonwebtoken, usado para gerar o token de acesso (autenticação do usuário)
import JWT from 'jsonwebtoken';

// Importa o Yup, usado para validar as informações enviadas pelo cliente
import * as Yup from 'yup';

// Importa as configurações do JWT (chave secreta e tempo de expiração)
import auth from '../../config/auth.js';

// Importa o modelo User, para pesquisar os dados do usuário no banco de dados
import User from '../models/User.js';

// Define a classe responsável pelo Login/Autenticação
class LoginControllers {
	// Método responsável por processar o login (geralmente usado em rotas POST)
	async store(req, res) {
		// Define as regras de validação para o email e senha
		const schema = Yup.object({
			email: Yup.string().required().email(), // Deve ser um texto, obrigatório e no formato de email
			password: Yup.string().min(6).required(), // Deve ser texto, ter pelo menos 6 caracteres e ser obrigatório
		});

		// Verifica se os dados enviados no corpo da requisição (req.body) seguem as regras acima
		const isValid = await schema.isValid(req.body, { strict: true });

		// Função auxiliar para padronizar a resposta caso o email ou a senha estejam errados
		const emailOfpasswordError = () => {
			return res.status(400).json({ error: 'errou passeiro' });
		};

		// Se a validação do Yup falhar, chama a função de erro
		// (Nota: faltou colocar 'return' antes da função aqui para parar a execução do código se der erro)
		if (!isValid) {
			emailOfpasswordError();
		}

		// Extrai o email e a senha digitados pelo usuário na requisição
		const { email, password } = req.body;

		// Busca no banco de dados se existe algum usuário cadastrado com esse email
		const existUser = await User.findOne({
			where: {
				email,
			},
		});

		// Se o usuário não for encontrado no banco de dados, retorna erro
		// (Nota: aqui também é importante usar 'return emailOfpasswordError()' para interromper o código)
		if (!existUser) {
			emailOfpasswordError();
		}

		// Compara a senha enviada no req.body com a senha criptografada salva no banco (password_hash)
		const corretPassword = await bcrypt.compare(
			password,
			existUser.password_hash,
		);

		// Se as senhas não combinarem, retorna o erro 400
		if (!corretPassword) {
			return res.status(400).json({ error: 'errou passeiro' });
		}

		// Aqui gera o token JWT assinado com o ID do usuário, usando a chave secreta e tempo de expiração
		const token = JWT.sign({ id: existUser.id }, auth.secret, {
			expiresIn: auth.expiresIn,
		});
		console.log('🔑 [LOGIN] SECRET USADA:', auth.secret);
		console.log('🎟️ [LOGIN] TOKEN GERADO:', token);

		// Se tudo der certo, retorna o status 200 (sucesso) com os dados do usuário e o token
		return res.status(200).json({
			id: existUser.id,
			name: existUser.name,
			email: existUser.email,
			admin: existUser.admin,
			token,
		});
	}
}

export default new LoginControllers();
