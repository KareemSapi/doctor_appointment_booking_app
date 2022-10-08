/**
 * @title
 * Application entry script: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

const express = require('express');
const compression = require('compression');
const logger = require('./utils/logger');
const config = require('config');
const sequelize = require('./db/postgreClient');
const cors = require('cors');
const passport = require('passport');
//const seedService = require('./api/models/seedService')

require('./passport');

const authRouter = require(`./api/routes/auth`);
const userRouter = require('./api/routes/user');
const appointmentRouter = require('./api/routes/appointment');
const patientRouter = require('./api/routes/patient');
const doctorRouter = require('./api/routes/doctor');

const app = express();

function logErrors(err, req, res, next) {
    logger.error(err);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something went wrong.' });
    } else {
        next(err);
    }
}

app.use(cors())
app.use(compression())
app.use(express.json())
//seedService

const app_name = "Doctor Appointment App" || config.get('app_details.name');
const { port, root } = config.get('api');
const PORT = 8080 || port
const auth = passport.authenticate('jwt', {session: false})

app.use(`${root}/auth`, authRouter);
app.use(`${root}/user`, userRouter);
//app.use(`${root}/role`, auth, roleRouter);
app.use(`${root}/patient`, patientRouter);
app.use(`${root}/doctor`, doctorRouter);
app.use(`${root}/appointment`, auth, appointmentRouter);

//Test DB is working.
sequelize.authenticate()
   .then(() => logger.info('Connection has been established successfully.'))
   .catch(error => logger.error('Unable to connect to the database:', error))

app.use(logErrors);
app.use(clientErrorHandler);

app.get('/', (req,res) => {
    res.send("Welcome to " + app_name || process.env.APP_NAME)
})

app.listen(PORT, logger.info(`Server started listening on port: ${PORT}`))