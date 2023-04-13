const { Pool, Client } = require('pg');
const Cursor = require('pg-cursor');
const { promisify} = require('util');
const { database } = require('../keys');
const fs = require('fs');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'passwds3cur3',
    port: 5432,
    database: 'QueComoDonde'
});

pool.connect((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
        console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is connected')
    return
})

//convirtiendo callbacks en promesas

pool.query = promisify(pool.query);
module.exports = pool