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
        domain: `http://localhost:4200`
    },
    auth: {
        jwt: {
            algorithm            : "HS256", 
            secret               :  '6IXPSpkk3QEdXgO0OQHRznGIuClWEPum',
            jwtAccessTokenExp    :  "10m", // 10 minutes
            jwtRefreshTokenExp   :  "1y", //1 year
        },
        cipherHelper: {
            secret        :  '98IgGSm19ENWr3rbC1WTisIditPcksBH',
            ttl           :  600000*3, // 30 min
            algorithm     : 'aes-256-ctr',
            inputEncoding : 'utf8',
            outputEncoding: 'hex',
            ENCRYPTION_KEY: '1TqILAWvMCLZw6kBYSwOrA1YhI8RGoE8',
            IV_LENGTH     : 16,
        },
    },
    mg : {
        api : '93e3632268528ccc108e57fa2bb097b5-10eedde5-d674a1ab',
        domain : 'sandboxd9c2a87ef56341119db73c6f493f65cb.mailgun.org'
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