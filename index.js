const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();
const pool = require('./database/database');

// DatabaseManager.connect()
//Inicializaciones
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global variables
app.use((req, res, next) => {
    next();
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');


//Routes reparar
//  app.use(require('/src/routes'));
//  app.use(require('/routes/authentication'));
//  app.use('/links',require('./src/routes/links'));

// Public

app.use(express.static(__dirname + "/src/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));



app.get('/', function(req,res){
res.render('index')
});

app.post('catalogo', function(req,res){
    let nombre = req.body.busqueda;
    console.log(nombre);
})

app.get('/nosotros', function(req,res){
    res.render('nosotros')
});
app.get('/blog', function(req,res){
    res.render('blog')
});

app.get('/ingresar', function(req,res){
    res.render('ingresar')
});

app.get('/catalogo', function(req,res){
res.render('catalogo')
})

//Public


//Starting the server
app.listen(app.get('port'), ()=> {
    console.log(`listening on port ${app.get('port')}`)
});