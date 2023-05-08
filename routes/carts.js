const express = require('express')
const { products } = require('./products')

const { Router } = express
const uuid4 = require('uuid4')
const router = new Router()
const ProductManager = require('../class/ProducManager')
const productManager = new ProductManager('./models/carts.json');
const productManager2 = new ProductManager("./models/products.json");

router.post("/", async (req, res) => {
    try {
        const carritos = await productManager.getArrays()
        let id = uuid4()
        let carrito = {
            id,
            products: []
        };
        carritos.push(carrito);
        await productManager.writeFile(carritos)
        res.json({ status: "success", data: carritos })
    } catch (err) {
        res.json({ status: "error", data: err })

    }

})

router.get("/:pid", async (req, res) => {
    try {
        const carritos = await productManager.getArrays()
        const id = req.params.pid
        const carrito = carritos.find(carrito => carrito.id == id)
        if (carrito) {
            res.json({ status: "success", data: carrito })
        } else {
            res.json({ status: "error", data: "no existe el carrito" })
        }
    } catch (err) {
        res.json({ status: "error", data: err })
    }


})

router.post("/:cid/product/:pid", async(req, res) => {
    try{
        const { cid, pid } = req.params;
        console.log(await productManager.getArrays())
        console.log(await productManager2.getArrays())
        const carritos = await productManager.getArrays()
        const products = await productManager2.getArrays()
        const carrito = carritos.find(carrito => carrito.id == cid)
        const product = products.find(product => product.id == pid)
        if (!carrito) {
            res.json({ status: "error", data: "no existe el carrito" })
        }
        if (!product) {
            res.json({ status: "error", data: "no existe el producto" })
        }
        const producto = { id: pid, quantity: 1 };
        let productoExistente = carrito.products.find(ele => ele.id == pid)
        console.log(carrito.products)
        if (productoExistente) {
            productoExistente.quantity++;
        } else {
            carrito.products.push(producto)
        }
        await productManager.writeFile(carritos)
        res.json({ status: "success", data: carrito })
        try {

        } catch (err) {
            res.json({ status: "error", data: err })
        }
    }catch(err){
        res.json({ status: "error", data: err })
    }
    
    
})
module.exports = router