const createError = require('http-errors'),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
    session = require('express-session'),
logger = require('morgan');
const multer = require('multer');
    User = require('./bin/database');
const fileUpload = require('express-fileupload');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mainRouter = require('./routes/main');
const regRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const mailboxRouter = require('./routes/mailbox');

app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/reg', regRouter);
app.use('/auth', authRouter);
app.use('/mailbox', mailboxRouter);

app.use(
    session({
      secret: 'secRet',
      saveUninitialized: false,
    })
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;