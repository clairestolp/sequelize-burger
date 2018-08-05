const connection = require('./connection');

//converts an object to sequel sentax
//e.g. {devoured: true} => 'devoured=true'
//e.g. {burger_name: "bacon cheese burger"} => 'burger_name="bacon cheese burger"'
const objToSql = function(obj) {
    let arr = [];

    for (let key in obj) {
        let value = obj[key];
        console.log(obj, key, value, typeof value);
        if (Object.hasOwnProperty.call(obj, key) && typeof value === 'string' && value.indexOf(' ') >= 0) {
            value = '"' + value + '"';
        } 
        arr.push(key += '=' + value);
    }

    return arr.toString();
}

const orm = {
    selectAll: function (input, cb) {
        const queryStr = 'SELECT * FROM ' + input + ';';
        connection.query(queryStr, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }, 

    insertOne: function (table, col, val, cb) {
        let queryStr = 'INSERT INTO ' + table;

        queryStr += ' (' + col.toString() + ') ';
        queryStr += 'VALUES (?);'

        console.log(queryStr);

        connection.query(queryStr, val, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //where obj is an object that contains the column and value to change
    //e.g. {devoured: true}
    updateOne: function (table, obj, condition, cb ) {
        let queryStr = 'UPDATE ' + table;

        queryStr += ' SET ';
        queryStr += objToSql(obj);
        queryStr += ' WHERE ' + condition + ';';
        
        console.log('query: ', queryStr);

        connection.query(queryStr, function (err, result){
            if (err) throw err;
            cb(result);
        });
    }, 

    deleteOne: function(table, condition, cb) {
        let queryStr = 'DELETE FROM ' + table;
        queryStr += ' WHERE ' + condition + ';';
        console.log(queryStr);
        connection.query(queryStr, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;