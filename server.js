const express = require('express');
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser');
const hbs = require('handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

hbs.registerPartial('burger', '{{burger}}');
hbs.registerPartial('devour', '{{devour-button}}')


const routes = require('./controllers/burgers_controller.js');
app.use(routes);

app.listen(PORT, function() {
    console.log('server listening on PORT: ' + PORT);
})