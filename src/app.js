const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");


const productoManager = require("./productManager");
const carritoCompleto = require("./cart");
// ----
const archivo = __dirname;
instancia = new productoManager.ProductManager(archivo + "/db.json");
instanciaCarrito = new carritoCompleto.CarritoCompleto(archivo + "/dbCart.json");

const express = require("express");

const productRouter = require("../routes/productsRoutes");
const cartRouter = require("../routes/cartRoutes");

const { request } = require("https");
const { send } = require("process");
const PORT = 8080;

const app = express()

const prefix = "api";


// SERVIDOR
app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.use(`/${prefix}/products`, productRouter);
app.use(`/${prefix}/cart`, cartRouter)

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
})

app.get("/", (request, response) => {
    response.send("En una api por el puerto " + PORT)
} )

