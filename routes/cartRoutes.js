const { Router } = require("express");

const router = Router();


router.post("/", async (req, res) => {
    const resultado = await instanciaCarrito.createCart()
    res.send(resultado)
})

router.get("/:cid", async(req, res) => {
    let cid = req.params.cid;
    // pid = parseInt(pid)
    if(isNaN(cid)){
        return res.status(400).send("Parametro incorrecto!")
    }
    
    const resultado = await instanciaCarrito.getCartById(cid);
    res.send(resultado)

})

router.post("/:cid/products/:pid", async(req,res) => {
    let { cid, pid } = req.params
    if(isNaN(cid) || isNaN(pid)){
        return res.status(400).send("Parametro incorrecto aca!")
    }
    // Se puede hacer logica para saber si el PID es de un producto existente.
    const cantidad = req.body;
    console.log(cantidad);
    if(cantidad.cantidad == undefined || cantidad == {}){
        const resultado = await instanciaCarrito.addProductCart(cid,pid)
        return res.send(resultado)
    }
    if(isNaN(cantidad)){
        return res.status(400).send("Parametro incorrecto!aca")
    }

    const resultado = await instanciaCarrito.addProductCart(cid,pid,cantidad)
    res.send(resultado)
})



module.exports = router;