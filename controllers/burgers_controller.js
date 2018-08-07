const db = require('../models');

module.exports = (app) => {

    //Render home
    app.get('/', (req, res) => {
        db.Burger.findAll({}).then((burgers) => {
            const obj = {burgers: burgers};

            res.render('index', obj);
        });
    });

    //GET one burger
    app.get('/api/burgers/:id?', (req, res) => {
        const id = req.params.id;
        db.Burger.findOne({
            where: {id: id}
        }).then((burger) => {
            res.json(burger);
        });
    });

    //GET all burgers
    app.get('/api/burgers', (req, res) => {
        db.Burger.findAll({ include: [ db.Customer ]}).then((burgers) => {
            res.json(burgers);
        });
    });

    //POST create new burger
    app.post('/api/burgers', (req, res) => {
        const newBurger = req.body.burger;
        db.Burger.create({
            burger_name: newBurger
        }).then((burger) => {
            res.json(burger);
        });
    });

    //PUT update existing burger
    app.put('/api/burgers/:id', (req, res) => {
        db.Burger.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((updated) => {
            res.json(updated);
        });
    });

    app.delete('/api/burgers/:id', (req, res) => {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if(result.affectedRows === 0) {
                res.status(404).send('Cannot find burger');
            }else{
                console.log('Success ', req.params.id, 'was deleted');
                res.json(result);
            }
            
        });
    });
}