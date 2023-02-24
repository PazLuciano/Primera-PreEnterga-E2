const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");

class CarritoCompleto{
    constructor(path){       
        this.path = path;
    }

    createCart = async () => {
        let info = await fs.readFile(this.path)
        let data = await JSON.parse(info)
        // console.log(data.Carritos);
        if (data.Carritos == undefined){            
            const data = {Carritos : [{id : 1, products : []}]}
            fs.writeFile(this.path, JSON.stringify(data))
            return "Carrito agregado correctamente!"
        }else{
            const id = data.Carritos.length + 1;
            data.Carritos.push({id : id , products : [] })
            fs.writeFile(this.path, JSON.stringify(data))
            return "Carrito agregado correctamente!!"
        }          
    }      
    getCart = async () =>{
        try {
            const info = await fs.readFile(this.path);
            const data = await JSON.parse(info);
            if(data.Carritos){
                return data.Carritos
            }else{
                const data = {Carritos : [{id : 1, products : []}]}
                fs.writeFile(this.path, JSON.stringify(data))
                const info = await fs.readFile(this.path);
                return info
            }            
        } catch (error) {
            console.log(error);    
        }
    }
    getCartById = async (id) => {
        const info = await this.getCart()
        console.log(info);
        let carritoEncontrado;
        info.forEach(element => {
            if (element.id == id) {
                carritoEncontrado = element;
            }
        })
        if(carritoEncontrado){
            return carritoEncontrado.products;
        }else{
            return "Producto no encontrado!"
        }
    }
    addProductCart = async(id, idProduct, cantidad = 1) => {
        const info = await this.getCart()
        // console.log(info);
        const carritoIndex = info.findIndex((element) => id == element.id )
        if(carritoIndex == -1){
            return "Carrito no encontrado!"
        }
        const carritoElegido = info[carritoIndex];
        console.log("cart", carritoElegido);
        const productoEnElCarrito = carritoElegido.products.some(product => product.product == idProduct);
        // Si encuentra en el carrito ID el product id product
        // console.log("T/F", productoEnElCarrito);
        if(carritoElegido.products.length == 0 || (productoEnElCarrito == false)){
            info[carritoIndex].products.push({product : idProduct, quantity : cantidad})
            fs.writeFile(this.path, JSON.stringify({Carritos : info}))
            return "producto agregado al carrito"
        }else{
            console.log("aca");
            const indexProduct = carritoElegido.products.findIndex((element) => element.product = idProduct )
            info[carritoIndex].products[indexProduct].quantity = info[carritoIndex].products[indexProduct].quantity + cantidad
            fs.writeFile(this.path, JSON.stringify({Carritos : info}))
        }
    }

}


exports.CarritoCompleto = CarritoCompleto