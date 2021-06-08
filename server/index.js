import express from "express"
import cros from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"


//ROUTES
import PostRoute from "./routes/post.js"
import userRoute from "./routes/userRoute.js"



const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cros())

 
//CONNECT ROUTE BY MIDDLEWARE
app.use('/posts', PostRoute)
app.use('/users', userRoute)


const PORT = process.env.PORT || 5000

mongoose.connect( process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server listening at ${PORT}`)))
    .catch(error => console.log(error))

mongoose.set('useFindAndModify', false)