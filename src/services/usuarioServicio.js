const { getConnectionDb } = require('../databases/index')

const obtenerTodosLosUsuarios = async ()=> {
    const db = await getConnectionDb()
    const usuarios = await db.collection('usuarios').find().toArray()
    return usuarios; 
}

const obtenerUsuarioPorId = async (id)=> {
    const db = await getConnectionDb()
    const usuario = await db.collection('usuarios').find({ cedula: parseInt(id) }).toArray()
    return usuario; 
}

const añadirNuevoUsuario = async (nuevoUsuario)=> {
    const db = await getConnectionDb()
    const usuarioCreado = await db.collection('usuarios').insertOne(nuevoUsuario)
    if (usuarioCreado.acknowledged){
        return {
            msg: 'usuario añadido con exito'
        }; 
    } else {
        return {
            msg: 'problemas al intentar añadir al nuevo usuario'
        }
    }
}

const editarUsuario = async (id, datosNuevos)=> {
    const db = await getConnectionDb()
    await db.collection('usuarios').findOneAndUpdate(
        { cedula: parseInt(id) },
        {
            $set: datosNuevos
        },
        { returnDocument: 'after' }
    )

    return {
        msg: 'usuario editado exitosamente'
    }
}

const eliminarUsuario = async (id)=> {
    const db = await getConnectionDb()
    const eliminado = await db.collection('usuarios').deleteOne({ cedula: parseInt(id) })
    if (eliminado.deletedCount >= 1){
        return {
            msg: 'usuario eliminado exitosamente'
        }
    } else {
        return {
            msg: 'error al intentar eliminar el usuario'
        }
    }
}

module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    añadirNuevoUsuario,
    editarUsuario,
    eliminarUsuario
}