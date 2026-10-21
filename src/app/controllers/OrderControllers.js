/* 
=============================================================================
CONTROLLER DE PRODUTOS (AddProdutsControllers.js)
=============================================================================
Padrão da arquitetura MVC:
- store  = Cria um novo produto (valida dados, imagem e salva no banco de dados)
- update = Atualiza os dados de um produto existente através do ID (req.params)
- index  = Lista todos os produtos cadastrados, incluindo a categoria de cada um
=============================================================================
*/

class OrderControllers {
	async store(req, res) {
		const { userid, username } = req;
		const order = {
			user: {
				id: userid,
				name: username,
			},
		};
		return res.status(201).json(order);
	}
}

export default new OrderControllers();
