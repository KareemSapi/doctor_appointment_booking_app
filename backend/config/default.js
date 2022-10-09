/**
 * @title
 * Application development environment configuration files: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

module.exports = {
    api: {
        port: 8080,
        root: '/api',
    },
    db: {
        //url: "",
        username: 'postgres',
        password: 12345678,
        dbName: 'doctor_booking_app',
        host: 'localhost',
        dialect: 'postgres',
    },
    frontend: {
        domain: ``
    },
    auth: {
        jwt: {
            algorithm            : "HS256", 
            secret               :  '6IXPSpkk3QEdXgO0OQHRznGIuClWEPum',
            jwtAccessTokenExp    :  "", 
            jwtRefreshTokenExp   :  ''
        },
        cipherHelper: {
            secret        :  '98IgGSm19ENWr3rbC1WTisIditPcksBH',
            ttl           :  '',
            algorithm     : 'aes-256-ctr',
            inputEncoding : 'utf8',
            outputEncoding: 'hex',
            ENCRYPTION_KEY: '',
            IV_LENGTH     : '',
        },
    },
    logger: {
        console: {
            level: 'debug',
        },
        file: {
            logDir  : 'logs',
            logFile : 'bundle_node.log',
            level   : 'debug',
            maxsize : 1024 * 1024 * 10, // 10MB
            maxFiles: 5,
        },
    },
    app_details : {
        name : 'Doctor Appointment App'
    },
}