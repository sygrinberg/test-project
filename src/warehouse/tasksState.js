const utils = require('../utils/utils');

const { uniqueId } = utils;

// This is the tasks state
let tasks = [];

module.exports = {
    types: {
        PICK: 'pick_from_stock',
        PUT: 'put_to_stock'
    },
    createTask: (action, product, location) => {
        return {
            product,
            action,
            location,
            id: uniqueId()
        };
    },
    insertTasks: newTasks => {
        tasks = [...tasks, ...newTasks];
    },
    getTasks: () => tasks,
    getTask: taskId => tasks.find(({ id }) => id === taskId),
    validateTask: taskId => tasks.find(({ id }) => id === taskId) ? true : false,
    completeTask: taskId => tasks = tasks.filter(({ id }) => taskId !== id),
};