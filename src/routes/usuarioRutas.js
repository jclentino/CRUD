const express = require('express')
const router = express.Router()
const { 
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    añadirNuevoUsuario,
    editarUsuario,
    eliminarUsuario, 
} = require('../services/usuarioServicio')

router.get('/api/usuarios/All', async (req,res)=> {
    try {
        const usuarios = await obtenerTodosLosUsuarios()
        return res.json(usuarios)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.post('/api/usuarios/Create', async (req,res)=> {
    try {
        const creado = await añadirNuevoUsuario(req.body)
        return res.json(creado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.get('/api/usuarios/Find/:id', async (req,res)=> {
    try {
        const usuario = await obtenerUsuarioPorId(parseInt(req.params.id))
        return res.json(usuario)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.put('/api/usuarios/Edit/:id', async (req,res)=> {
    try {
        const editado = await editarUsuario(parseInt(req.params.id), req.body)
        return res.json(editado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

router.delete('/api/usuarios/Remove/:id', async (req,res)=> {
    try {
        const eliminado = await eliminarUsuario(parseInt(req.params.id))
        return res.json(eliminado)
    } catch (e){
        return res.json({
            error: e
        })
    }
})

module.exports = router  