const express =  require('express') 
const dotenv = require ('dotenv');
const connectDB = require( './config/db');
const router = require("./routes/routes")
const cors = require('cors')

dotenv.config()

connectDB();

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', router)
app.get('/', (req, res) =>{
    res.send("<h1>Welcome to web scrapping</h1>")
        
    
})

const PORT = process.env.PORT || 3030;

app.listen(PORT,() =>{
    console.log(`server Running  on ${PORT}`);
})