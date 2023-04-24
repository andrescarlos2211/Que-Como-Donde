const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

const app = express();
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
    host: "localhost",
    user: "admin",
    database: "QueComoDonde",
    password: "passwds3cur3",
    port: "5432"
});

//Obtener listado completo de usuarios
app.get("/api/v1/users", (req, res)=>{
    pool.query('select * from user_credentials', (err, res) => {
        if(err){
            resp.json({err})
        }else{
            resp.json(res.rows)
        }
    })
});
//Eliminar un usuario

app.delete("/api/v1/users/:id", (req, res)=>{
    pool.query('delete from user_credentials where id = $1', req.params.id ,(err, res) => {
        if(err){
            resp.json({err})
        }else{
            resp.json(res.rows)
        }
    })
});



app.listen(3000, () =>{
    console.log('Servicio iniciado en el puerto 3000')
});