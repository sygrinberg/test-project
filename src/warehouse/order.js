const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const warehouse = require('./warehouseState');
const tasks = require('./tasksState');

const { isProductExists, getProductLocation } = warehouse;
const { types, createTask, insertTasks } = tasks;
const { PICK } = types;

const makeOrderTasks = items => {
    const tasks = items.map(item => createTask(PICK, item, getProductLocation(item)));
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
        throw new Error('Order contains invalid items!');
    }
    return true;
}

router.use(bodyParser.json());

router.post('/order', (req, res) => {
    const { body } = req;
    const { items } = body;
    const isValid = validateOrder(items);

    if (isValid) {
        makeOrderTasks(items);
    }
    res.status(200);
    res.send({ success: true });
});

module.exports = router;