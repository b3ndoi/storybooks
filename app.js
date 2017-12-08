const express = require('express');
const exhbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
    useMongoClient:true
})
    .then(() => console.log('MongoDB COnnected..'))
    .catch(err=> console.log(err));

const routes = require('./routes/web');
const app = express();

app.engine('handlebars', exhbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
    res.locals.user = req.user || null;
    next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

module.exports = app;