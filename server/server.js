const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

// Configure CORS
app.use(cors());

//Configure Express to accept form data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Configure dotenv
//dotenv.config({path: './config/config.env'})

const hostname = 'localhost';
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/big-basket-angular').then((response) => {
    console.log('Connected to MongoDB successfully..')
}).catch((error) =>{
    console.error(error);
    process.exit(1);
})

//Basic urls
app.get('/', (request, response) => {
    response.send('<h2>Welcome to Express JS- Big Basket Application</h2>');
})

// Configure Router
app.use('/api', require('./router/productRouter'))

//Listen to port
app.listen(port,hostname,() => {
    console.log(`Express server started at: ${hostname}:${port}`);
})
