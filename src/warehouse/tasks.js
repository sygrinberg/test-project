const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tasksState = require('./tasksState');
const warehouseState = require('./warehouseState');

const { completeTask, validateTask, getTasks, getTask } = tasksState;
const { updateStock } = warehouseState;

const executeTask = ({ action, product }) => {
    const isOK = updateStock(product, action);
}

router.use(bodyParser.json());

router.post('/tasks/:taskId/complete', (req, res) => {
    const { params } = req;
    const { taskId } = params;
    const task = getTask(taskId);
    if (!task) {
        throw new Error(`Invalid taskId: ${taskId}`);
    }
    const isOK = updateStock(task.product, task.action);
    if (!isOK) {
        throw new Error(`Couldnot complete task`);
    }
    completeTask(taskId);
    res.status(200);
    res.send({ success: true });
});

router.get('/next-tasks', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.status(200);
    res.send({ tasks: getTasks() });
});

module.exports = router;