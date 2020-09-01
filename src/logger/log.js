module.exports = {
    error: (message, data) => {
        // Handle log
        console.error(message);
        console.log(data);
    },
    info: (message, data) => {
        console.info(message);
        console.log(data);
    }
};