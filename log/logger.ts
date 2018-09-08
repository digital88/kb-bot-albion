import * as winston from 'winston'

// Configure logger settings
export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.simple()
    })
})