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
import { createUser, createPublication, syncTables, emailExists, getUser } from './database/orm/ormHandler.js'
import { fileURLToPath } from 'url';
import { User_credentials } from './database/orm/user_credentials.js'
import { timeStamp } from 'console';
import { UUID } from 'sequelize';
// import method-override from 'method-override'

testConnection();
// emailExists('andrescarlos2211@gmail.com')
syncTables() 
//createUser('andrescarlos2211@gmail.com','QuarkUp', 'itsatrap');


//Inicializaciones


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
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());



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

        if (usuario.password == password) {
            currentUserId = usuario.user_id;
            return done(null, { email: usuario.username })
        }
        else {
            return done(null, false, { message: 'Contraseña Incorrecta' })
        }
    }
}));
// //Serialization
passport.serializeUser(function (mail, done) {
    done(null, mail)
});
//Deserialization
passport.deserializeUser(async function (mail, done) {
    // console.log(mail)
    done(null, mail);
});
//settings
app.set('port', process.env.PORT || 5000)
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
    cacheControl: true
}));
//
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/ingresar');
}
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
        currentUserId = null
        res.redirect('/');
    });
});
app.post('/registro', function (req, res) {
    const mail = req.body.username
    const pw = req.body.password
    const name = req.body.name
    createUser(mail, name, pw)
    res.redirect('/dash')
});
app.get('/publicar', async (req, res) => {
    try {
        const regionesJSON = await fetch("http://localhost:4000/api/v1/regiones",
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
        res.render('publicar', { regiones: regionesUnicas, ciudades: listaCiudades });
    }
    catch (error) {
        console.error(error);
    }
});
app.get('/ciudades', async (req, res) => {
    try {
        const regionSeleccionada = req.query.region;
        const ciudadesJSON = await fetch(`http://localhost:4000/api/v1/ciudades?region=${regionSeleccionada}`);
        const ciudades = await ciudadesJSON.json();
        res.send(ciudades);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.post('/publicar', ensureAuthenticated, async function (req, res) {


    let archivo;
    let uploadPath;
    let nombreArchivo
    let imgdir
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Sin archivo enviado');
      }
      archivo = req.files.archivo;
      nombreArchivo = uuidv4() + archivo.name;

      uploadPath = __dirname + '/src/public/pubimg/' + nombreArchivo 
    
      archivo.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
      });
      imgdir = '/pubimg/'+ nombreArchivo

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
    }
console.log(data)
    const response = await fetch('http://localhost:4000/api/v1/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    res.render('index');
});

// app.get('/publicarimg', function (req, res) {
//     res.render('publicarimg')
// });
// app.post('/publicarimg', function (req, res) {
//     let archivo;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('Sin archivo enviado');
//       }
    
//       archivo = req.files.archivo;
//       uploadPath = __dirname + '/src/public/pubimg/' + archivo.name;
    
//       archivo.mv(uploadPath, function(err) {
//         if (err)
//           return res.status(500).send(err);
          
//         res.render('dash')
//       });
// })

app.get('/catalogo', function (req, res) {
    res.render('catalogo')
});
app.get('/contacto', function (req, res) {
    res.render('contacto')
});
app.get('/dash', ensureAuthenticated, function (req, res) {
    res.render('dash')
});
//Starting the server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
});