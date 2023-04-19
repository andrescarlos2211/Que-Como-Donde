// const passportLocal = require('passport-local').Strategy
//Rutas

import express from 'express'
import path from 'path';
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { Strategy as LocalStrategy } from 'passport-local';
import { sequelize, testConnection } from './database/db.js'
import { createUser, createPublication, syncTables, emailExists } from './database/orm/ormHandler.js'
import { fileURLToPath } from 'url';
testConnection();
emailExists('andrescarlos2211@gmail.com')
// syncTables()
// createUser('andrescarlos2211@gmail.com','QuarkUp', 'itsatrap');

//Inicializaciones
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) //reconoce json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('NKwUmJzAXE'));
app.use(session({
    secret: 'h8VHePweUU',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(function (username, password, done) {
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

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
// Public

app.use(express.static(new URL('./src/public', import.meta.url).pathname, {
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