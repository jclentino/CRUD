const express = require('express')
const usuariosRutas = require('./routes/usuarioRutas')
const empleosRutas = require('./routes/empleosRutas')
const { getConnectionDb } = require('./databases/index')

const app = express()
app.use(express.json())


app.get('/', (req,res)=> {
    res.send('hola')
})

app.use(usuariosRutas)
app.use(empleosRutas)

const puerto = 5000
app.listen(puerto, ()=> {
    console.log('escuchando en el puerto '+puerto)
})