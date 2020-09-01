const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const warehouse = require('./warehouseState');

const { getStock } = warehouse;

router.use(bodyParser.json());

router.get('/stock', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.status(200);
    res.send(getStock());
});

module.exports = router;