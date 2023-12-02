const express = require('express')
const router = express.Router()
const { 
    obtenerTodosLosEmpleos,
    obtenerEmpleoPorId,
    añadirNuevoEmpleo,
    editarEmpleo,
    eliminarEmpleo, 
} = require('../services/empleosServicios')

router.get('/api/empleos/All', async (req,res)=> {
    try {
        const empleos = await obtenerTodosLosEmpleos()
        return res.json(empleos)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.post('/api/empleos/Create', async (req,res)=> {
    try {
        const creado = await añadirNuevoEmpleo(req.body)
        return res.json(creado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.get('/api/empleos/Find/:id', async (req,res)=> {
    try {
        const empleo = await obtenerEmpleoPorId(req.params.id)
        return res.json(empleo)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.patch('/api/empleos/Edit/:id', async (req,res)=> {
    try {
        const editado = await editarEmpleo(req.params.id, req.body)
        return res.json(editado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.delete('/api/empleos/Remove/:id', async (req,res)=> {
    try {
        const eliminado = await eliminarEmpleo(req.params.id)
        return res.json(eliminado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

module.exports = router  