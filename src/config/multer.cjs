//SEMPRE TENHA CERTEZA
// Importa o Multer, que é o middleware usado no Node.js para receber e salvar arquivos (imagens, pdfs, etc.) enviados via formulário
const multer = require('multer');

// Importa a ferramenta 'resolve' do Node.js para montar caminhos de arquivos de forma correta
const { resolve } = require('node:path');

// Importa a biblioteca uuid para gerar um código único (identificador) para cada arquivo
const { v4 } = require('uuid');

// Exporta a configuração do Multer para ser usada nas rotas que recebem arquivos
module.exports = {
	// Define onde e como os arquivos serão salvos no disco
	storage: multer.diskStorage({
		// destination: Define a pasta final onde os arquivos serão salvados
		// Sobe duas pastas para cima e vai até a pasta 'uploads'
		destination: resolve(__dirname, '..', '..', 'uploads'),

		// filename: Função que define o nome que o arquivo terá ao ser salvo no disco
		// _req não é usado aqui, então tem um underline à frente
		// file contém as informações do arquivo enviado (nome original, tipo, etc.)
		// callback é a função que deve ser chamada quando terminarmos de definir o nome
		filename: (_req, file, callback) => {
			// Gera um ID aleatório (UUID) e junta com o nome original do arquivo
			// Exemplo: "a1b2c3d4-foto-perfil.jpg"
			// Isso evita conflito de nomes se dois usuários enviarem um arquivo com o mesmo nome
			const mergeName = v4().concat(`-${file.originalname}`);

			// Finaliza o processo: null indica que não houve erro, e mergeName é o novo nome do arquivo
			return callback(null, mergeName);
		},
	}),
};