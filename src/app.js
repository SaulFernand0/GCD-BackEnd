const express = require('express') 
const morgan = require('morgan')
const userRoutes = require('./routes/user.routes')
const fileRoutes = require('./routes/file.routes')
const emailRoutes = require('./routes/email.routes')
const authRoutes = require('./routes/auth.routes')

const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/', function(req, res, next){
    res.send('Bienvenido a Node JS...!');
});
app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;