const db = require('../models');

module.exports = (app) => {
    //get one customer
    app.get('/api/customers/:name?', (req, res) => {
        const name = req.params.customerName;
        db.Customer.findOne({
            where: {
                customer_name: name
            }
        }).then((customer) => res.json(customer));
    });
}

