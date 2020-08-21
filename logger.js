const moment = require('moment');

const logger = (req, res, next)=>{
    console.log(`${req.path} ${req.ip} ${req.method} ${moment.calendarFormat()}`);
    next();
}

module.exports = logger;