const express = require('express');
const cors = require('cors');
const app = express();
const {database} = require('./database/database');
const userRoute = require('./routes/userRoute');

require('dotenv').config();

//middleware
app.use(express.json());    //recieve and use json expressions
app.use(cors());            //security
app.use("/api/users", userRoute);

app.get("/", (req, res) =>{
    res.send('Welcome to the chat app api.');
});

const port = process.env.PORT || 5050;

const server = () =>{ 
    database();
    app.listen(port, () => {
    console.log(`Running on port ${port}!`);
});
}

server();