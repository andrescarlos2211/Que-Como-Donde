//Importación de librerias
import express from 'express'
import path from 'path';
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passportLocal from 'passport-local';
import flash from 'express-flash';
import { sequelize, testConnection } from './database/db.js'
import { createUser, createPublication, syncTables, emailExists, getUser } from './database/orm/ormHandler.js'
import { fileURLToPath } from 'url';
import { User_credentials } from './database/orm/user_credentials.js'
testConnection();
// emailExists('andrescarlos2211@gmail.com')
// syncTables()
// createUser('andrescarlos2211@gmail.com','QuarkUp', 'itsatrap');

//Inicializaciones
const app = express();
const PassportLocal = passportLocal.Strategy
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) //reconoce json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('NKwUmJzAXE'));
app.use(session({
    secret: 'NKwUmJzAXE',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new PassportLocal(async function (username, password, done) {
    let validador = -1;
    let users = await getUser(username);

    if (users.map(e => e.username).indexOf(username) != -1) {
        validador = users.map(e => e.username).indexOf(username);
    } else {
        return done(null, false, { message: 'Correo no registrado' })
    };

    if (validador != -1) {
        let usuario = users[validador];

        if (usuario.password == password) {
            return done(null, { email: usuario.username })
        }
        else {
            return done(null, false, { message: 'Contraseña Incorrecta' })
        }
    }
}));
// //Serialization
passport.serializeUser(function (mail, done) {
    console.log(mail.email);
    done(null, mail)
});
//Deserialization
passport.deserializeUser(async function (mail, done) {
    console.log(mail)
    done(null, mail);
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
//Rutas *******************************************************************************************
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
    req.flash('error', req.flash)
    res.render('ingresar')
});
app.post('/ingresar', passport.authenticate('local', {
    successRedirect: '/dash',
    failureRedirect: '/ingresar'
}));
app.post('/salir', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
app.post('/registro', function (req, res) {
    const mail = req.body.username
    const pw = req.body.password
    const name = req.body.name
    createUser(mail, name, pw)
    console.log('Usuario registrado')
    res.redirect('/dash')
});
app.get('/publicar', function (req, res) {

    res.render('publicar')
});
app.post('/publicar', function (req, res) {
    const nombre = req.body.nombre_producto
    const descripcion = req.body.descripcion
    const ubicacion = req.body.ubicacion
    const precio = req.body.precio
    const unidades = req.body.unidades
    const kw1 = req.body.kw1
    const kw2 = req.body.kw2
    const producto = req.body.producto
    createPublication(nombre, precio, descripcion, producto, ubicacion, kw1, kw2, unidades)
});
app.get('/catalogo', function (req, res) {
    res.render('catalogo')
});
app.get('/contacto', function (req, res) {
    res.render('contacto')
});
app.get('/dash', function (req, res) {

    // console.log(req.session)
    console.log(req.email)
    res.render('dash', {
        
    })
});
//Starting the server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
});+