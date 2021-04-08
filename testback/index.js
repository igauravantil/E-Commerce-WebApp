const express = require("express");

const app = express();

const port = 8000;

const admin = (req, res) => {
    return res.send("Home dashboard");
}



app.get("/signout", (req, res) => {
    return res.send("you are signed out");
});

app.get("/signup", (req, res) => {
    return res.send("you are visiting signup route");
});

app.get("/hitesh", (req, res) => {
    return res.send("he uses instagram");
});

app.get("/", (req, res) => {
    return res.send("home page");
});




const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

const isloggedin = (req, res, next) => {
    console.log("admin is logged in");
    next();
};


app.get("/admin",isloggedin, isAdmin, admin);


app.get("/login", (req, res) => {
    return res.send("hello there, you are in the login route");
});

app.listen(port, () => {
    console.log("server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))