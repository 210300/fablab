// const {
//     createLogger,
//     transports,
//     format
// } = require('winston');
// require('winston-mongodb');


// const logger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'info.log',
//             level: 'info',
//             format: format.combine(format.timestamp(), format.json())
//         }),
//         new transports.MongoDB({
//             level: 'error',
//             db: "mongodb://localhost:27017/node",
//             options: {
//                 useUnifiedTopology: true
//             },
//             collection: 'history',
//             format: format.combine(format.timestamp(), format.json())
//         })
//     ]
// })

// module.exports = logger;

const {createLogger, transports, format} = require('winston')

const customerLogger = createLogger({
    transports:[
        new transports.File({
            filename:'customer.log',
            level: 'info',
            format:format.combine(format.timestamp(), format.json())
        }),
       new transports.File({
           filename:'customer-err.log',
           level: 'error',
        format:format.combine(format.timestamp(), format.json())
       })
    ]
})
module.exports = {customerLogger};