// *** Dependencies
// =============================================================
const express = require('express');
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser');
const hbs = require('handlebars');



//Set up Express App
// =====================================================================
const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./models');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

hbs.registerPartial('burger', '{{burger}}');
hbs.registerPartial('devour', '{{devour-button}}')


const burgerRoutes = require('./controllers/burgers_controller.js')(app);
const customerRoutes = require('./controllers/customers_controller.js')(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('server listening on PORT: ' + PORT);
    });
}); 

    