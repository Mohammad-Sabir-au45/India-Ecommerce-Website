const express = require("express")
const app = express();

const cookieParser = require("cookie-parser");
const errormiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require("path")


//dotenv config

require('dotenv').config()




// application middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())







// importing Routes
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoutes")
const orderRouter = require("./routes/orderRoute")


app.use("/", productRouter)
app.use("/", userRouter)
app.use("/", orderRouter)

// app.use(express.static(path.join(__dirname, "../client/build")))

const buildPath = path.join(__dirname, '../client/build')
app.use(express.static(buildPath))



app.get("*", (req, res) => {
  res.sendFile(`${buildPath}/index.html`)
})


// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
// })


//routebase midleware for 
app.use(errormiddleware)

module.exports = app