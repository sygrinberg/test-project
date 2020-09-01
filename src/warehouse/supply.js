const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const warehouse = require('./warehouseState');
const tasks = require('./tasksState');

const { isProductExists, getProductLocation } = warehouse;
const { types, createTask, insertTasks } = tasks;
const { PUT } = types;

const makeSupplyTasks = items => {
    const tasks = items.map(item => createTask(PUT, item, getProductLocation(item)));
    insertTasks(tasks)
}

const checkIfItemsExists = (items = []) => {
    return items.find(item => !isProductExists(item))
    ? false : true;
}

const validateOrder = (items = [] ) => {
    if (!items.length) {
        throw new Error('No items were wer provided!');
    }
    if (!checkIfItemsExists(items)) {
        throw new Error('Supply contains invalid items!');
    }
    return true;
}

router.use(bodyParser.json());

router.post('/supply', (req, res) => {
    const { body } = req;
    const { items } = body;
    const isValid = validateOrder(items);
    
    if (isValid) {
        makeSupplyTasks(items);
    }
    res.status(200);
    res.send({ success: true });
});

module.exports = router;