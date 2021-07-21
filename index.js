const express = require("express");
const Producto = require("./Producto.js");
// const hbs = require('express-handlebars')
const routerProductos = express.Router()
const app = express();
const PORT = 8080;
const pug = require('pug');
//configuracion de handlebars
// app.engine("hbs",hbs({
//     extname:"hbs",
//     defaultLayout:"index.hbs",
//     layoutsDir:__dirname +"/views/layouts",
//     partialsDir:__dirname +"/views/partials/"
// }) )
// app.set("views", "./views")
// app.set("view engine", "hbs")

//configuracion de pug
app.set("views", "./views")
app.set("view engine", "pug")



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos/',routerProductos)

const prod = new Producto()


routerProductos.get("/listar", (req, res) => {
    const data = prod.listar()
    res.json( data.length !== 0 ? {productos:data} : {error: 'no hay productos cargados'})        
})

app.get("/productos/vista", (req, res) => {
    const data = prod.listar()
    res.render("main", data.length !== 0 ? {productos:data} : {error: 'no hay productos cargados'})
})
app.get("/",(req, res) => {
    res.render("crearProducto.pug")
})


routerProductos.get("/listar/:id",( req, res ) => {
    const result = prod.buscarPorId( parseInt(req.params.id))
    res.json(result ? {producto: result} : {error: 'producto no encontrado'})
})

routerProductos.post("/guardar/",( req, res ) => {
    producto = req.body
    const guardado = prod.guardar(producto)
    console.log(guardado)
    res.redirect("/productos/vista")
    
})
routerProductos.put("/actualizar/:id",( req, res ) => {
    producto = req.body
    const result = prod.editar(parseInt(req.params.id),producto)
    res.json( result )
})
routerProductos.delete("/borrar/:id",( req, res ) => {
    const result = prod.eliminar(parseInt(req.params.id))
    res.json( result )
})


const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`error en el servidor ${error}`));