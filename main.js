const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
res.render('index')
});

app.listen(port);
console.log(`Servicio levantado en el puerto ${port}!`);