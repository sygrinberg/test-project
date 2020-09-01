const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000';

let tasks = [];
let working;

const getTasks = () => {
    axios({
        method: 'GET',
        url: '/next-tasks',
        responseType: 'json',
    })
        .then(response => {
            const { data } = response;
            tasks = data.tasks;
        })
        .catch(err => {
            console.log('error')
            console.log(err)
        })
        .finally(() => {
            working = false;
        })
}

const executeTasks = task => {
    axios({
        method: 'POST',
        url: `/tasks/${task.id}/complete`,
        responseType: 'json',
    })
        .then(() => {
            console.log('Remaining tasks')
            console.log(tasks);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            tasks.shift();
            working = false;
        })
}

initRobot = () => {
    setInterval(() => {
        if (working) return;
        working = true;
        if (tasks.length) {
            executeTasks(tasks[0]);
        } else {
            getTasks();
        }
    }, 500)
}

module.exports = {
    initRobot
}