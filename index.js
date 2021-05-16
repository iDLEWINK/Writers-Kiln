const dotenv = require(`dotenv`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
const handlebars_helper = require(`./views/handlebars-helper.js`);
const routes = require(`./routes/routes.js`);
const session = require('express-session');
const db = require(`./models/db.js`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

app.use(express.static(`public`));
app.use(`/`, routes);

app.use(session({
    secret: `writers-kiln-session`,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

db.connect();

app.listen(port, hostname, function() {
	console.log(`Server running at:`);
	console.log(`http://` + hostname + `:` + port);
});
