import * as winston from 'winston'

// Configure logger settings
export const logger = winston.createLogger({
    level: 'debug',
    transports: new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
    })
})