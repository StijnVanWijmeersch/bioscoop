require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")
const helmet = require("helmet")

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const movieRouter = require("./routes/movies");
const presentationRouter = require("./routes/presentations");
const ticketRouter = require("./routes/tickets");
const seatRouter = require("./routes/seats");

const app = express();

const allowedOrigins = [
    "http://localhost:5173"
]

const corsOptions = {
    origin: (origin, callback) => {

        if(!origin) return callback(null, true);

        if(allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified origin.";
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    },  
    credentials: true
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/movies", movieRouter);
app.use("/presentations", presentationRouter);
app.use("/tickets", ticketRouter);
app.use("/seats", seatRouter);

module.exports = app;
