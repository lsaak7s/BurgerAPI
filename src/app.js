//SEMPRE TENHA CERTEZA
import express from 'express';
import fileRouterConfig from './config/fileRouterConfig.cjs';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRouterConfig);
app.use(router);

export default app;
