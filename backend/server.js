const app=require("./app")
port=process.env.PORT ||4000

const {initDB}=require("./dbConfig")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });





 //dotenv config
 require('dotenv').config()

//  require('dotenv').config({path:"backend/.env"})





//connection to databse
initDB()

//cloudinary configuration 
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY ,
    api_secret:process.env.API_SECRET ,
    secure: true
})



app.listen(port, ()=>{
    console.log(`server is working on http://localhost:${port}`);
})