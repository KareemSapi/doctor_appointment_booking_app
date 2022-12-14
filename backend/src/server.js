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
const path = require('path');
// const seedService = require('./api/models/seedService')

require('./passport');

const app = express();

let corsOptions = {
    origin: '*'
  }

app.use(cors(corsOptions))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.disable("x-powered-by");
// seedService

app.use(express.static('./dist/front-end'))

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

const authRouter = require(`./api/routes/auth`);
const userRouter = require('./api/routes/user');
const appointmentRouter = require('./api/routes/appointment');
const patientRouter = require('./api/routes/patient');
const doctorRouter = require('./api/routes/doctor');


const app_name = "Doctor Appointment App" || config.get('app_details.name');
const { port, root } = config.get('api');
const PORT = process.env.PORT || 8081
const auth = passport.authenticate('jwt', {session: false})

app.use(`${root}/auth`, authRouter);
app.use(`${root}/user`, userRouter);
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
    res.sendFile(path.join(__dirname, '/dist/front-end/index.html'))
})

app.listen(PORT, logger.info(`Server started listening on port: ${PORT}`))