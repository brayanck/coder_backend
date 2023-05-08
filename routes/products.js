const express = require('express')
const { Router } = express
const uuid4 = require('uuid4')
const routesProducts = new Router()
const ProductManager = require('../class/ProducManager')
const productManager = new ProductManager("./models/products.json");

routesProducts.get("/", async (req, res) => {
    const products = await productManager.getArrays()
    try {

        if (req.query.limit) {
            let removed = products.splice(0, req.query.limit);
            res.send(removed)
        }
        else {
            res.json({ status: "success", data: products })
        }

    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}
)
routesProducts.get("/:pid", async (req, res) => {
    const products = await productManager.getArrays()
    try {
        let id = req.params.pid
        const product = products.find(product => product.id == id)
        if (product) {
            res.json({ status: "success", data: product })
        } else {
            res.json({ status: "error", data: "Product not found" })
        }
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
})

routesProducts.post("/", async (req, res) => {
    try {
        let products = await productManager.getArrays()
        let product = req.body
        if (
            !product.code ||
            !product.description ||
            !product.price ||
            !product.title ||
            !product.stock ||
            !product.category
        ) {
            res.send({ status: "error", data: "faltan datos" })
        } else {
            if(!product.status){
                product.status = true
            }
            product.id = uuid4()
            products=[...products,product]
            await productManager.writeFile(products)
            res.json({ status: "success", data: product })
        }
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }


})
routesProducts.put("/:pid", async (req, res) => {
    try {
        const products = await productManager.getArrays()
        let id = req.params.pid
        let nuevoProducto = req.body
        const product = products.find(product => product.id == id)
        const index = products.findIndex(producto => producto.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            for (let atributo in nuevoProducto) {
                if (product.hasOwnProperty(atributo)) {
                    product[atributo] = nuevoProducto[atributo];
                }
            }
            const productoActualizado = {
                ...product,
                id: id
            };
            products.push(productoActualizado)
            await productManager.writeFile(products)
            res.json({ status: "success", data: product})
        } else {
            res.json({ status: "error", data: "Product not found" })
        }

    } catch {
        res.json({ status: "error", message: "Error al actualizar producto" })
    }


})

routesProducts.delete("/:pid", async(req, res) => {
    try{
    const products = await productManager.getArrays()
    let id = req.params.pid
    const index = products.findIndex(producto => producto.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        await productManager.writeFile(products)
        res.json({ status: "success", data: products })
    } else {
        res.json({ status: "error", data: "Product not found" })
    }
    }catch(err){
        res.json({ status: "error", message: err.message })
    }
    
})


module.exports = { routesProducts,productManager }