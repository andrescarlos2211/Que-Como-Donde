//Rutas
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();
const pool = require('./database/database');
const productos = require("./database/Productos.json")
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;
import {sequelize, testConnection} from './database/db.js';
import { createUser, createPublication } from './database/orm/ormHandler';
testConnection();

//Inicializaciones
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) //reconoce json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('lucifer'));
app.use(session({
    secret: 'baphomet',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(function (username, password, done) {
    if (username === 'lucifer@latinmail.com' && password === 'belial')
        return done(null, { id: 1, name: 'Cody' });
    done(null, false);
}));
//Serialization

passport.serializeUser(function (user, done) {
    done(null, user.id)
});
//Deserialization
passport.deserializeUser(function (id, done) {
    done(null, { id: 1, name: 'Cody' });
});
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

//Rutas

app.get('/', function (req, res) {
    res.render('index')
});

app.get('/catalogo', function (req, res) {
    // let busqueda = req.query.busqueda;
    // console.log(busqueda);
    // res.send(busqueda);
    console.log(productos);
    res.render('catalogo', {
        productos
    })
});

// app.post('catalogo', function(req,res){
//     let nombre = req.body.busqueda;
//     console.log(nombre);
// })

app.get('/nosotros', function (req, res) {
    res.render('nosotros')
});
app.get('/blog', function (req, res) {
    res.render('blog')
});
app.get('/ingresar', function (req, res) {
    res.render('ingresar')
});
app.post('/ingresar', passport.authenticate('local',{
    successRedirect: '/dash',
    failureRedirect: '/ingresar'
}));


app.post('/registro', function (req, res) {
    const mail = req.body.username
    const pw = req.body.password
    const name = req.body.name
});
app.get('/publicar', function (req, res) {
    res.render('publicar')
});


app.get('/catalogo', function (req, res) {
    res.render('catalogo')
});
app.get('/contacto', function (req, res) {
    res.render('contacto')
});

app.get('/dash', function (req, res) {
    res.render('dash')
});
//Public


//Starting the server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
});