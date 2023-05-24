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
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';
import { sequelize, testConnection } from './database/db.js'
import { createUser, createPublication, syncTables, emailExists, getUser, profiledata } from './database/orm/ormHandler.js'
import { fileURLToPath } from 'url';
import { User_credentials } from './database/orm/user_credentials.js'
import { timeStamp } from 'console';
import { UUID } from 'sequelize';
import bcrypt from 'bcryptjs';
import storagePackage from '@google-cloud/storage';
const { Storage } = storagePackage;
switch (process.argv[2]) {
    case 'sync':
        syncTables()
        break;

    case 'admin':
        createUser('andrescarlos2211@gmail.com', 'QuarkUp', '$2a$10$YHukGD0HYRn3WOUOklca9.16a7CkBJolDmjWhkAfIhrWAMC5HZaOK', '/pubimg/webmaster.jpg', 'true');
        console.log("Usuario: andrescarlos2211@gmail.com, contraseña: itsatrap")
        break
}
//Inicializaciones
// Crea una instancia del cliente de Google Cloud Storage
const storage = new Storage({
    projectId: 'potent-app-387504',
    keyFilename: 'src/public/js/potent-app-387504-a3246eee8fc0.json',
});
// Nombre del bucket en Google Cloud Storage
const bucketName = 'bucketquecomodonde';
const app = express();
const PassportLocal = passportLocal.Strategy
let currentUserId = null
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) //reconoce json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('NKwUmJzAXE'));
app.use(session({
    secret: 'NKwUmJzAXE',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());
//Definicion de estrategia local para autentificar usuarios
passport.use(new PassportLocal(async function (username, password, done) {
    let validador = -1;
    let users_ = await getUser(username);

    if (users_.map(e => e.username).indexOf(username) != -1) {
        validador = users_.map(e => e.username).indexOf(username);
    } else {
        return done(null, false, { message: 'Correo no registrado' })
    };

    if (validador != -1) {
        let usuario = users_[validador];

        // Utiliza bcrypt para comparar las contraseñas
        const match = await bcrypt.compare(password, usuario.password);

        if (match) {
            currentUserId = usuario.user_id;
            return done(null, usuario);
        }
        else {
            return done(null, false, { message: 'Contraseña Incorrecta' });
        }
    }
}));
// //Serialization
passport.serializeUser(function (mail, done) {
    done(null, mail)
});
//Deserialization
passport.deserializeUser(async function (mail, done) {
    done(null, mail);
});
//Se utiliza un puerto disponible o en su defecto el 5000
app.set('port', process.env.PORT || 5000)
//middlewares
// Morgan para revision de errores
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Global variables
app.use((req, res, next) => {
    next();
});
app.set('views', path.join(__dirname, 'src', 'views'));
//Motor de renderizado EJS
app.set('view engine', 'ejs');
//Definicion de ruta estatica (publica)

app.use(express.static(path.join(__dirname, 'src', 'public')));
//

//Esta funcion requiere autentificación para acceder a ciertas rutas
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/ingresar');
}
//Rutas *******************************************************************************************
app.get('/', async function (req, res) {
    // let users_ = await profiledata(currentUserId);
    // Esta condicion es para que no se muestre el logo en el index
    res.locals.condicion = true;
    let correouser = false
    if (correouser) {
        correouser = req.user.email
    }
    else {
        correouser = false
    }
    let response = await fetch(`https://api-qcc.onrender.com/api/v1/ultimaspublicaciones`)
    let data = await response.json();
    res.render('index', { currentUserId, isLoggedIn: correouser, data, condicion: res.locals.condicion })
});
app.get('/catalogo', function (req, res) {
    res.render('catalogo', {isLoggedIn: req.user});
});
app.post('/catalogo', async function (req, res) {
    let busqueda = req.body.busqueda;
    const response = await fetch(`https://api-qcc.onrender.com/api/v1/simplesearch/${busqueda}`)
    const data = await response.json(); // Convertir la respuesta en formato JSON
    
    if (Object.keys(data).length === 0) {
        // JSON vacío
        console.log('El JSON está vacío');
        res.render('catalogo', { data: null, isLoggedIn: req.user });
    } else {
        // JSON con datos
        console.log(data);
        res.render('catalogo', { data, isLoggedIn: req.user });
    }
})
app.get('/nosotros', function (req, res) {
    res.render('nosotros')
});
app.get('/ingresar', function (req, res) {
    req.flash('error', 'un mensaje de error')
    res.render('ingresar')
});
app.post('/ingresar', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/ingresar'
}));
app.post('/salir', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        currentUserId = null
        res.redirect('/');
    });
});
app.post('/registro', async function (req, res) {
    try {
        const mail = req.body.username
        const pw = req.body.password
        const namek = req.body.name
        const hashedPassword = await bcrypt.hash(pw, 10);
        createUser(mail, namek, hashedPassword)
        res.render('registro', { successMessage: 'Registro exitoso' })
    }
    catch (err) {
        res.send(err)
    }
});
app.get('/registro', function (req, res) {
    res.render('registro')
});
app.get('/publicar', ensureAuthenticated, async (req, res) => {
    try {
        const regionesJSON = await fetch("https://api-qcc.onrender.com/api/v1/regiones",
            {
                'mode': 'no-cors',
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                }
            });


        const comunas = await regionesJSON.json()
        const regiones = [];
        comunas.rows.forEach((comuna) => {
            regiones.push(comuna.region);
        });
        const regionesUnicas = [...new Set(regiones)];
        const listaCiudades = comunas.rows.map(item => {
            return {
                region_id: item.region_id,
                nombre_comuna: item.nombre_comuna
            }
        });
        const comunas_ = [];
        comunas.rows.forEach((comuna) => {
            comunas_.push(comuna.nombre_comuna);
        });

        let users_ = await profiledata(currentUserId);
        // console.log(currentUserId);
        // console.log(users_);

        const response = await fetch(`https://api-qcc.onrender.com/api/v1/publications/${currentUserId}`);
        const data = await response.json();

        res.render('publicar', {data, users_, regiones: regionesUnicas, ciudades: listaCiudades, isLoggedIn: req.user });
    }
    catch (error) {
        console.error(error);
    }
});
app.post('/publicar', ensureAuthenticated, async function (req, res) {
    let archivo;
    let nombreArchivo
    let imgdir


    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Sin archivo enviado');
        }
        archivo = req.files.archivo;
        nombreArchivo = uuidv4() + archivo.name;

        const fileUploadPath = path.join(__dirname, 'src/public/pubimg', nombreArchivo);
        await archivo.mv(fileUploadPath);

        const bucket = storage.bucket(bucketName);
        await bucket.upload(fileUploadPath, {
            destination: nombreArchivo,
        });

        imgdir = bucket.file(nombreArchivo).publicUrl();

        // Enviar formulario a la API
        const data = {
            publication_name: req.body.nombre_publicacion,
            publication_price: req.body.precio,
            publication_description: req.body.descripcion,
            region_id: req.body.Region,
            comuna_id: req.body.Ciudad,
            keyword1: req.body.kw1,
            keyword2: req.body.kw2,
            publication_qty: req.body.unidades,
            user_id: currentUserId,
            imgdir: imgdir,
        };

        const response = await fetch('https://api-qcc.onrender.com/api/v1/publicaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        res.render('publicado', { successMessage: 'Publicado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
app.get('/ciudades', async (req, res) => {
    try {
        const regionSeleccionada = req.query.region;
        const ciudadesJSON = await fetch(`https://api-qcc.onrender.com/api/v1/ciudades?region=${regionSeleccionada}`);
        const ciudades = await ciudadesJSON.json();
        res.send(ciudades);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.get('/contacto', function (req, res) {
    res.render('contacto')
});
app.get('/index', async function (req, res) {
    const users_ = await profiledata(currentUserId);
    let response = await fetch(`https://api-qcc.onrender.com/api/v1/ultimaspublicaciones`)
    let data = await response.json();
    res.render('index', { isLoggedIn: req.user, data });
});
app.get('/dash', ensureAuthenticated, async function (req, res) {
    const response = await fetch(`https://api-qcc.onrender.com/api/v1/publications/${currentUserId}`);
    const data = await response.json();
    const users_ = await profiledata(currentUserId);
    const correouser = req.user.email
    res.render('dash', { data, users_, isLoggedIn: req.user, correouser: correouser })
});
app.get('/modusr', ensureAuthenticated, async function (req, res) {
    // const response = await fetch(`https://api-qcc.onrender.com/api/v1/publications/${currentUserId}`);
    let users_ = await profiledata(currentUserId);
    let correouser = req.user.email
    // const data = await response.json();
    // let users_ = await profiledata(currentUserId);
    // let correouser = req.user.email
    res.render('modusr', { users_, isLoggedIn: req.user })
});
app.get('/modpub', ensureAuthenticated, async function (req, res) {
    // const response = await fetch(`https://api-qcc.onrender.com/api/v1/publications/${currentUserId}`);
    let users_ = await profiledata(currentUserId);
    let correouser = req.user.email
    // const data = await response.json();
    // let users_ = await profiledata(currentUserId);
    // let correouser = req.user.email
    res.render('modpub', { users_, isLoggedIn: req.user })
});

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
});