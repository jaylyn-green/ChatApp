const express = require('express');
const cors = require('cors');
const app = express();
const {database} = require('./database/database');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');

require('dotenv').config();

//middleware
app.use(express.json());    
app.use(cors());            
app.use("/api/users", userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

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