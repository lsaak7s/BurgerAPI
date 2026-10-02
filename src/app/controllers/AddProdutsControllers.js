/* controles
Padrao da aquitetura MVC
So pode aver apenas 1 de cada
store = cria dados
index = lista todos os usuarios
show = lista um dado
update = atualiza um dado
delete = remove um dado
*/
//Sempre temos que deixar tudo bem documetado
//SEMPRE TENHA CERTEZA


class AddProdutsControllers {
	async store(req, res) {
		return res.status(201).json({ ok: true });
	}
}

export default new AddProdutsControllers();
