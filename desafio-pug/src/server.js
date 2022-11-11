const express = require('express');
const { Router } = require('express');
const path = require('path');
const cla = require('./ej');

const viewsFolder = path.join(__dirname, "views");

const app = express();

PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));

let ob = new cla.Contenedor()

const routerProductos = Router();

app.set("views", viewsFolder);
app.set("view engine", "pug");

app.get("/",(req, res)=>{
    res.render("add");  
})

routerProductos.get("/",(req, res)=>{
    const listProductos = ob.getAll();
    if(listProductos == "No hay productos"){
        res.render("vacio", {
            mensaje: listProductos
        })
    }else {
        res.render("list", {
            productos: listProductos
        })
    }
})

routerProductos.post("/",(req, res)=>{
    let productoNuevo = req.body;
    let productoAgregado = ob.save(productoNuevo);
    res.redirect("/");
})

app.use('/productos', routerProductos);