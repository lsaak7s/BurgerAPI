/* 
=============================================================================
INICIALIZAÇÃO DO SERVIDOR (src/server.js)
=============================================================================
Padrão da arquitetura / Entrypoint (Ponto de Entrada):
- Importa a conexão do banco de dados (database/index.js) para inicializar
  os models e relacionamentos antes de subir a aplicação.
- Importa a instância configurada do Express (app.js).
- Inicia a escuta da API na porta 3000 (app.listen) e emite uma mensagem
  no console confirmando que o servidor está pronto para receber requisições.
=============================================================================
*/

import app from './app.js';
import './database/index.js';

app.listen(3000, () => console.log('Burger API running ad port 3000'));