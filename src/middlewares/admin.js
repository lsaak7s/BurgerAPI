const adminMidllewares = (req, res, next) => {
	const adminToken = req.userIsAdmin;

	if (!adminToken) {
		return res.status(401).json({ error: 'Não e comandante filho' });
	}
	return next();
};

export default adminMidllewares;
