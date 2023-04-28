//Importacion de modulos
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const port = 4000
// const expressFileUpload = require('express-fileupload');
const morgan = require('morgan')
//Inicializaciones
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(expressFileUpload({

//      limits: { fileSize: 5000000},
//      abortOnLimit: true,
//      responseOnLimit: "El peso del archivo es superior a lo permitido"
//  })
//  );
//Definicion de pool
const pool = new Pool({
    host: "localhost",
    user: "admin",
    database: "QueComoDonde",
    password: "passwds3cur3",
    port: "5432"
});

//******************Rutas de API ***************************************************

//Obtener listado completo de usuarios
app.get("/api/v1/users", (req, res) => {
    pool.query('select * from user_credentials', (err, res) => {
        if (err) {
            res.json({ err })
        } else {
            res.json(res.rows)
        }
    })
});
//Obtener todas las regiones
app.get("/api/v1/regiones", async (req, res) => {
    try {
        const regiones = await pool.query('select regions.region_id, regions.nombre_region as region, comunas.nombre_comuna from regions INNER JOIN comunas ON comunas.region_id = regions.region_id;')
        res.json(regiones)
    }
    catch (err) {
        console.log(err)
    }
});
// Obtener ciudades
app.get("/api/v1/ciudades", async (req, res) => {
    try {
        const { region } = req.query
        const ciudades = await pool.query(
            "SELECT comuna_id, nombre_comuna as ciudad FROM comunas WHERE region_id = $1",
            [region]
        );
        res.json(ciudades.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
// Crear Publicacion
app.post("/api/v1/publicaciones", async (req, res) => {
    //Envio de formulario

    const {
        publication_name,
        publication_price,
        publication_description,
        region_id,
        comuna_id,
        keyword1,
        keyword2,
        publication_qty,
        user_id
    } = req.body


    try {
        const publ = await pool.query(
            `INSERT INTO publications (publication_name, publication_price, publication_description, region_id, comuna_id, keyword1, keyword2, publication_qty, user_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                publication_name,
                publication_price,
                publication_description,
                region_id,
                comuna_id,
                keyword1,
                keyword2,
                publication_qty,
                user_id,
            ]
        );
        
        res.json({ message: "Publicación creada correctamente" });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    console.log('Publicación creada correctamente')
});
    //Eliminar un usuario
    app.delete("/api/v1/users/:id", (req, res) => {
        pool.query('delete from user_credentials where id = $1', req.params.id, (err, res) => {
            if (err) {
                resp.json({ err })
            } else {
                resp.json(res.rows)
            }
        })
    });

    app.listen(port, () => {
        console.log('Servicio iniciado en el puerto ', port)
    });