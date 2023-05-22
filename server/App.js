const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash"); // Import express-flash
const loginRouter = require("./routes/login.js");
const signUpRouter = require("./routes/signup.js");
const createDatabase = require("./db/dbConnection");
const path = require('path');


const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 1000 * 10,
      httpOnly: true,
    },
  })
);

app.use(flash()); // Add express-flash middleware after session middleware

app.use(loginRouter, signUpRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on", PORT));

