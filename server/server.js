const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const app = express();
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
//middlewares
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//routes Middleware
app.use("/api/users", userRoute);

//routes
app.get("/",(req, res)=>{
    res.send("home");
});
const PORT = process.env.PORT || 5000;
//Error
app.use(errorHandler);
//connect to db and start server
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
})
.catch((err)=> console.error(err));
