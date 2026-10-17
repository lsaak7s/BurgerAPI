//SEMPRE TENHA CERTEZA
// Importa o Express, que é o framework principal para criar o servidor da API
import express from 'express';

// Importa a configuração de arquivos estáticos (o middleware que serve as imagens da pasta 'uploads')
// Lembrando que este arquivo vem de um .cjs (CommonJS)
import fileRouterConfig from './config/fileRouterConfig.cjs';

// Importa todas as rotas da aplicação (o arquivo onde estão definidos POST /users, GET /products, etc.)
import router from './routes.js';

// Cria a instância principal do aplicativo Express
const app = express();

// Middleware global: Permite que o Express leia dados enviados em formato JSON
// Necessário para que o req.body funcione nas rotas que recebem JSON
app.use(express.json());

// Middleware global: Permite que o Express leia dados de formulários (tudo que não é JSON)
// O { extended: true } permite usar parser mais complexo
app.use(express.urlencoded({ extended: true }));

// Registra a rota para arquivos estáticos
// Quando alguém chamar /product-file/nome-da-imagem.jpg,
// o Express vai procurar essa imagem na pasta 'uploads' e devolver o arquivo
app.use('/product-file', fileRouterConfig);

// Registra todas as rotas da aplicação (o router importado acima)
// Isso conecta os URLs (como /users, /products) aos controladores
app.use(router);

// Exporta a configuração da aplicação para ser usada no servidor principal (ex: server.js)
export default app;