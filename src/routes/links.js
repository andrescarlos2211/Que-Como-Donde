const express = require('express');
const router = express.Router();
const pool = require('../../database/database.js');

router.get('/add', (req, res) => {
    res.send('form')
});