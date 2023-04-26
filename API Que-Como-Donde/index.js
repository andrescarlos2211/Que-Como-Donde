const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const cors = require('cors');

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


app.use(cors());
  
//Obtener listado completo de usuarios
app.get("/api/v1/users", (req, res)=>{
    pool.query('select * from user_credentials', (err, res) => {
        if(err){
            res.json({err})
        }else{
            res.json(res.rows)
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
//Obtener todas las regiones
app.get("/api/v1/regiones", async (req, res)=>{
    try{
    const regiones = await pool.query('select regions.region_id, regions.nombre_region as region, comunas.nombre_comuna from regions INNER JOIN comunas ON comunas.region_id = regions.region_id;')
        res.json(regiones)
    }
    catch(err){
        console.log(err)
    }
});

// Obtener ciudades

app.get("/api/v1/ciudades", async (req, res) => {
    try {
      const { region } = req.query
      const ciudades = await pool.query(
        "SELECT nombre_comuna as ciudad FROM comunas WHERE region_id = $1",
        [region]
      );
      res.json(ciudades.rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });



app.listen(4000, () =>{
    console.log('Servicio iniciado en el puerto 4000')
});