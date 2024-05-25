//importing
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config()
const PORT = process.env.PORT;
require('./DB/connection')

const todoRoute = require('./Route/todoRoute');

//initialization
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use('/api',todoRoute);


//listening
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})