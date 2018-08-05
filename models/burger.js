const orm = require('../config/orm');

const burger = {
    all: function (cb) {
        orm.selectAll('burgers', function(res){
            cb(res);
        });
    }, 

    create: function (val, cb) {
        orm.insertOne('burgers', ['burger_name'], val, function(res){
            cb(res);
        });
    }, 

    update: function (obj, condition, cb) {
        orm.updateOne('burgers', obj, condition, function (res) {
            cb(res);
        });
    },

    delete: function (condition, cb) {
        orm.deleteOne ('burgers', condition, function(res) {
            cb(res);
        });
    }
}

module.exports = burger;