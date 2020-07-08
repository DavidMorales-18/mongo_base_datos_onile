require('./config/config')
const express = require('express');
const app = express(); //objeto app de express
const bodyParser = require('body-parser') //
const mongoose = require('mongoose'); //libreria 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // capa intemedia entre el servido (midelworg)
    /* Cada vez que se hace un asalicitud al servicio va estar ejecutandose  */

// parse application/json
app.use(bodyParser.json()) // 



/* app.get('/',(req,res)=>{
    res.send('Hola Mundo ')//vamso a mandar un hola mundo 
}) */

app.get('/usuario', (req, res) => { // peticion a la raiz --> peticiones get 
    res.json("get Usuario"); // El json es el que domina 
    //obtener un servicion en la base de datos 
});

app.post('/usuario', (req, res) => { //peticiones post
    let body = req.body //cuerpo de la peticion
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({ // una respuesta --> y envio un objeto body
            persona: body

        });

    }
    //res.json("post Usuario");
});

app.put('/usuario/:id', (req, res) => { //actualizar un usuario pero debe de ir con el id
    //res.json("put Usiario")
    let id = req.params.id; //llega a travez de la peticion del id 
    res.json({ //una archivo json 
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});

/* CONECCION CON LA BASE DE DATOS  */
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE !!!');


});


app.listen(process.env.PORT, () => { //Escuchara en el puerto 3000
    console.log("Escuchando en el puerto", process.env.PORT);
});

/* 
Post -> nuevos registros al servidor 
put -> Actualizar datos 
get -> obtener datos consultas 
dilite -> Eliminar archivos o registros pero no eliminar es mejor cambiar de estado a inactivo  */

/* succerssful : 200 ;Recuersos 
redireccion: 300 ; Te redirige a otro lado
client Error:400 ; Cuando el cliente hace mal su peticion 
server Error:500; Servido falla error mio
*/