const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const { databaseConnector } = require('./modules/databaseModule');

const app = express();
const databaseClient = databaseConnector.then(instance => instance.connection.getClient());

app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ client: databaseClient }),
    cookie: {
        maxAge: (process.env.SESSION_TTL_IN_MIN * 60 * 1000)
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/indexRouter');
const apiRouter = express.Router();
const authRouter = require("./routes/authRouter");
const usersRouter = require('./routes/userRouter');
const contactsRouter = require('./routes/contactRouter');

app.use('/', indexRouter);
app.use('/api', apiRouter)
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/contacts', contactsRouter);

module.exports = app;
