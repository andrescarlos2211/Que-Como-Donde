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

//Definicion de pool
const pool = new Pool({
  host: "localhost",
  user: "admin",
  database: "QueComoDonde",
  password: "passwds3cur3",
  port: "5432"
});

//******************Rutas de API ***************************************************

//Obtener listado completo de publicaciones por un usuario
app.get("/api/v1/publications/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const publicaciones = await pool.query('SELECT * FROM publications WHERE user_id = $1', [user_id]);
    console.log(publicaciones.rows);
    res.json(publicaciones.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
//Obtener todas las regiones y ciudades
app.get("/api/v1/regiones", async (req, res) => {
  try {
    const regiones = await pool.query('select regions.region_id, regions.nombre_region as region, comunas.nombre_comuna from regions INNER JOIN comunas ON comunas.region_id = regions.region_id;')
    res.json(regiones)
  }
  catch (err) {
    console.log(err)
  }
});
// Obtener solo ciudades y ordenarlas por orden alfabetico
app.get("/api/v1/ciudades", async (req, res) => {
  try {
    const { region } = req.query
    const ciudades = await pool.query(
      "SELECT comuna_id, nombre_comuna as ciudad FROM comunas WHERE region_id = $1 ORDER BY nombre_comuna ASC",
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
    user_id,
    imgdir
  } = req.body

  console.log(req.body)
  try {
    const publ = await pool.query(
      `INSERT INTO publications (publication_name, publication_price, publication_description, region_id, comuna_id, keyword1, keyword2, publication_qty, user_id, imgDir) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
        imgdir
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

//Buscar en publicaciones de acuerdo a palabras ingresadas, consulta usada en la pagina principal.
app.get("/api/v1/simplesearch/:consulta", async (req, res) => {
  try {
    const { consulta } = req.params;
    console.log(consulta)
    let publicaciones = await pool.query(`SELECT uc.email, uc.username, uc.profilepic ,  p.imgdir, p.publication_name, p.publication_price, p.publication_description, p.keyword1, p.keyword2
    FROM publications p
    INNER JOIN user_credentials uc ON p.user_id = uc.user_id
    WHERE p.publication_name ILIKE '%' || $1 || '%' OR p.publication_description ILIKE '%' || $1 || '%' OR p.keyword1 ILIKE '%' || $1 || '%' OR p.keyword2 ILIKE '%' || $1 || '%';`, [consulta]);
    console.log(publicaciones.rows);
    res.json(publicaciones.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//CRUD usuarios***********************************************************************************************

app.get("/api/v1/users", async (req, res) => {
  try {
    let usuarios = await pool.query('select * from user_credentials');
    res.json(usuarios.rows)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.post("/api/v1/users", async (req, res) => {
  try {
    const { email, username, profilepic, password } = req.body;
    let usuarios = await pool.query('insert into user_credentials (email, username, profilepic, password) VALUES ($1, $2, $3, $4); ', [email, username, profilepic, password]);
    res.json(usuarios.rows)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.put("/api/v1/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { email, username, profilepic, password } = req.body;
    const query = `UPDATE user_credentials SET email=$1, username=$2, profilepic=$3, password=$4 WHERE user_id=$5`;
    const result = await pool.query(query, [email, username, profilepic, password, user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    var id = req.params.id
    let usuarios = await pool.query('delete from user_credentials where user_id = $1', [id]);
    res.json(usuarios.rows)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
//CRUD PUBLICACIONES *****************************************************************

// Crear Publicacion
app.get("/api/v1/publicaciones", async (req, res) => {
  try {
    let publicaciones = await pool.query(`SELECT publication_id, publication_name, publication_price, publication_description, keyword1, keyword2, publication_qty, region_id, comuna_id, user_id, imgdir
    FROM publications
    GROUP BY user_id, publication_id, publication_name, publication_price, publication_description, keyword1, keyword2, publication_qty, region_id, comuna_id, imgdir;
    `);
    res.json(publicaciones.rows)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
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
    user_id,
    imgdir
  } = req.body

  console.log(req.body)
  try {
    const publ = await pool.query(
      `INSERT INTO publications (publication_name, publication_price, publication_description, region_id, comuna_id, keyword1, keyword2, publication_qty, user_id, imgDir) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
        imgdir
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
app.put("/api/v1/publicaciones/:id", async (req, res) => {

  console.log(req.body)
  const user_id = req.params.id;
  const {
    publication_name,
    publication_price,
    publication_description,
    region_id,
    comuna_id,
    keyword1,
    keyword2,
    publication_qty,
    imgdir
  } = req.body
  try {
    const publ = await pool.query(
      `UPDATE publications SET publication_name=$1, publication_price=$2, publication_description=$3, keyword1=$4, keyword2=$5, publication_qty=$6, comuna_id=$7, region_id=$8, imgdir=$9 WHERE user_id=$10`,
      [
        publication_name,
        publication_price,
        publication_description,
        keyword1,
        keyword2,
        publication_qty,
        comuna_id,
        region_id,
        imgdir,
        user_id,
      ])
    res.json(publ.rows);
  }
  catch (err) {
    console.log(err)
  }
});
app.delete("/api/v1/publicaciones/:id", async (req, res) => {
  try {
    var id = req.params.id
    let usuarios = await pool.query('delete from publications where user_id = $1', [id]);
    res.json(usuarios.rows)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log('Servicio iniciado en el puerto ', port)
});