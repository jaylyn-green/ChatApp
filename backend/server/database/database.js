const mongoose = require('mongoose');
require("dotenv").config()

const uri = process.env.MONGO_URI

const database = async () =>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("Databse Connected!");
    } catch(error){
        console.log("Databace connection failed!", error.message);
    }
}
module.exports = {database};