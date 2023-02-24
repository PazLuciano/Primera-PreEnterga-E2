// const { log } = require("console");
// const fs = require("fs/promises");
const path = require("path");
const { Router } = require("express");



const router = Router();



router.get("/", async (req, res) => {

    let productos = await instancia.getProducts()
    console.log(productos);
    const { limit } = req.query;
    if (limit) {
        let productosSeleccionados = []
        let numero = 1;
        productos.forEach(element => {
            if (numero <= limit){
                productosSeleccionados.push(element);
                numero ++;
            }
        });
        return res.send(productosSeleccionados)
    }
    else{
        return res.send(productos)
    }
    
})


router.get("/:pid", async (req, response) => {

    const pid = req.params.pid;
    if(isNaN(pid)){
        return response.status(400).send("Parametro incorrecto!")
    }
    
    let producto = await instancia.getProductById(pid)   
    
    response.send(producto)
}
);

router.post("/", async (req,res) => {
    const product = req.body
    // console.log("body", product);
    const resultado = await instancia.addProduct(product);
    console.log("res =>" ,resultado);
    res.send(resultado)
})
router.put("/:pid", async(req,res) => {
    const pid = req.params.pid;
    if(isNaN(pid)){
        return res.status(400).send("Parametro incorrecto!")
    }
    const objActualizar = req.body;
    const resultado = await instancia.updateProduct(pid, objActualizar);
    res.send(resultado);

})
router.delete("/:pid", async(req,res) => {
    const pid = req.params.pid;
    if(isNaN(pid)){
        return res.status(400).send("Parametro incorrecto!")
    }  
    const resultado = await instancia.deleteProduct(pid)
    res.send(resultado)
})



module.exports = router;