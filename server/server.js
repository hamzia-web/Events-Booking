const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Configure CORS
app.use(cors());

//Configure Express to accept/receive form data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Configure dotenv
dotenv.config({path: './config/config.env'})

const hostname = 'localhost';
const port = 5000;

//const hostname = process.env.HOST_NAME;
//const port = process.env.PORT

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/events-booking-angular').then((response) => {
    console.log('Connected to MongoDB successfully..')
}).catch((error) =>{
    console.error(error);
    process.exit(1);
})

//Basic urls
app.get('/', (request, response) => {
    response.send('<h2>Welcome to Express JS- Events Booking Application</h2>');
})

// Configure Router
app.use('/events', require('./router/eventRouter'))
app.use('/users', require('./router/userRouter'))

//Listen to port
app.listen(port, hostname,() => {
    console.log(`Express server started at: ${hostname}:${port}`);
})
