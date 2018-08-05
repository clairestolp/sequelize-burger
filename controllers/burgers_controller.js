const express = require('express');
const burger = require('../models/burger');

const router = express.Router();

//home
router.get('/', function (req, res) {
    burger.all(function(results){

        results.forEach(function(val){
            if(val.devoured === 1) {
                val.devoured = true;
            }else{
                val.devoured = false;
            }
        });
        
        obj = { 
            burgers: results
        }
        res.render('index', obj);
    });
    
});

//get all burgers
router.get('/api/burgers', function (req, res) {
    burger.all(function(results){
        console.log(results);
        res.json(results);
    });
});

//get one burger
router.get('/api/burgers/:burger?', function (req, res) {
    
});

//create new burger
router.post('/api/burgers', function (req, res) {
    const newBurger = req.body.burger;
    burger.create(newBurger, function (results) {
        res.json(results);
    });
});

//update burger
router.put('/api/burgers/:id?', function(req, res){
    const condition = 'id=' + req.params.id;
    const obj = {devoured: req.body.devoured}
    burger.update(obj, condition, function (result) {
        
        if(result.affectedRows === 0){
            res.status(404).send('Cannot find burger');
        }else{
            console.log('Burger', req.params.id, 'was updated!')
            res.status(200).json(result);
        }
    });
});

//delete burger
router.delete('/api/burgers/:id?', function (req, res) {
    const condition = 'id=' + req.params.id;
    burger.delete(condition, function (result) {
        if(result.affectedRows === 0) {
            console.log(result);
            res.status(404).send('Cannot find burger');
        }else{
            console.log('Success', req.params.id, 'was deleted');
            res.status(200).json(result);
        }
    });
});

module.exports = router;