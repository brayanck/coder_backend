const express = require('express')
const app =express()
const {routesProducts} = require('./routes/products')
const routesCarts = require('./routes/carts')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)
app.get('/',(req,res)=>{

    res.send("hola mundo")
})

app.listen(8080,()=>{
    console.log("el servidor esta corriendo en el puerto 8080")
})