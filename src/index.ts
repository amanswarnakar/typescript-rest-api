require("dotenv").config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = "8080";
}
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
