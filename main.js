const express = require('express');
const morgan = require('morgan')
const port = 3000;

//Inicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'));
// starting the server
app.listen(port);
console.log(`Servicio levantado en el puerto ${port}!`);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
res.render('index')
});

app.get('/catalogo', function(req,res){
res.render('catalogo')
})

