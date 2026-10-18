/* 
=============================================================================
CONFIGURAÇÃO DE AUTENTICAÇÃO JWT (auth.js)
=============================================================================
Padrão da arquitetura / Configurações:
- Exporta as configurações utilizadas pelo JSON Web Token (JWT).
- secret: Chave secreta usada para criptografar e verificar a assinatura dos tokens.
- expiresIn: Define o tempo de validade do token gerado (ex: '7d' = 7 dias).
=============================================================================
*/

export default {
  secret: '9911e2ff9d13a55545e177f144de4e68',
  expiresIn: '7d',
};