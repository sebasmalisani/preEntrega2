import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import { __dirname } from "./utils/constantsUtil.js";
import websocket from "./websocket.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Start server in PORT ${PORT}`);
});

const URI =
  "mongodb+srv://sebasmalisani:ga0QEDK1El6F1Fta@cluster0.mou6n85.mongodb.net/db47315?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

//Handlebars Config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/../views");
app.set("view engine", "handlebars");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const io = new Server(httpServer);

websocket(io);
