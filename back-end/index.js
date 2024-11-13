dotenv = require('dotenv').config();
const express = require('express');
const csrf = require('csurf');
const flash = require('connect-flash');
const passport = require('./passport-config');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const infoRoutes = require('./routes/info')
const authRoutes = require('./routes/auth');
const statisticsRoutes = require('./routes/statistics');
const questionsRoutes = require('./routes/questions');
const ticketsRoutes = require('./routes/tickets');
const adminPanelRoutes = require('./routes/admin-panel');
const varMiddleware = require('./middleware/variables');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        increment: function (value) {
            return parseInt(value) + 1;
        }
    }
});

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI_ATLAS
    // uri: process.env.MONGO_URI_LOCAL
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true,}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(varMiddleware);

app.use('/', infoRoutes);
app.use('/auth', authRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/questions', questionsRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/admin-panel', adminPanelRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI_ATLAS);
        // await mongoose.connect(process.env.MONGO_URI_LOCAL);
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }


}

start();

