require('dotenv').config()
//this is my connection
const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");




//DBconnection
mongoose.connect(process.env.DATABASE, 
{ useNewUrlParser: true, 
useUnifiedTopology: true,
useUnifiedTopology: true}).then(() => {console.log("DB CONNECTED...");});



//this is my middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);







//PORT
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});