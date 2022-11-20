const express = require('express');
const config = require('./config/dev.json');

const orderRoutes = require('./src/warehouse/order');
const supplyRoutes = require('./src/warehouse/supply');
const stockRoutes = require('./src/warehouse/stock');
const tasksRoutes = require('./src/warehouse/tasks');
const log = require('./src/logger/log');

const robot = require('./src/robot/robot');

const app = express();

app.use(orderRoutes);
app.use(supplyRoutes);
app.use(stockRoutes);
app.use(tasksRoutes);

app.use((err, req, res, next) => {
    if (err) {
        log.error(err.message, {
            stack: err.stack,
            body: req.body,
            params: req.params,
            path: req.path,
            url: req.url,
            query: req.query
        });
        res.status(500);
        res.send(err.message);
    }
});



const { port } = config;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

robot.initRobot();


// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
// Test comment
