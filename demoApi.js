module.exports = {
	getCustomerName: function(req) {
		return { customerName : req.name || 'missing' };
	}
};