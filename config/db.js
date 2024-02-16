const mongoose = require( 'mongoose')


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URLS)
        console.log( `Connected Mongodb Database ${conn.connection.host}`) 
    } catch (error) {
        console.log(`Error in Mongodb Database ${error}`)
    }

};
module.exports = connectDB;
