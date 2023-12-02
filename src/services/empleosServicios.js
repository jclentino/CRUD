const { ObjectId } = require('mongodb');
const { getConnectionDb } = require('../databases/index')

const obtenerTodosLosEmpleos = async ()=> {
    const db = await getConnectionDb()
    const empleos = await db.collection('empleos').find().toArray()
    return empleos; 
}

const obtenerEmpleoPorId = async (id)=> {
    const db = await getConnectionDb()
    const empleo = await db.collection('empleos').findOne({ _id: new ObjectId(id)})
    return empleo; 
}

const añadirNuevoEmpleo = async (nuevoEmpleo)=> {
    const db = await getConnectionDb()
    const usuario = await db.collection('usuarios').findOne(nuevoEmpleo?.usuario_id)

    if (!usuario){
        return {
            msg: 'usuario no existe'
        }
    }

    const empleoCreado = await db.collection('empleos').insertOne(nuevoEmpleo)
    if (empleoCreado.acknowledged){
        return {
            msg: 'empleo añadido con exito'
        }; 
    } else {
        return {
            msg: 'problemas al intentar añadir al nuevo empleo'
        }
    }
}

const editarEmpleo = async (id, datosNuevos)=> {
    const db = await getConnectionDb()
    let usuario = null

    if (datosNuevos?.usuario_id){
        usuario = await db.collection('usuarios').findOne({ _id: new ObjectId(nuevoEmpleo?.usuario_id)})
        if (!usuario){
            return {
                msg: 'usuario no existe'
            }
        }
    }

    await db.collection('empleos').findOneAndUpdate(
        { _id: new ObjectId(id)},
        {
            $set: datosNuevos
        },
        { returnDocument: 'after' }
    )

    return {
        msg: 'empleo editado exitosamente'
    }
}

const eliminarEmpleo = async (id)=> {
    const db = await getConnectionDb()
    const eliminado = await db.collection('empleos').deleteOne({ _id: new ObjectId(id) })
    if (eliminado.deletedCount >= 1){
        return {
            msg: 'empleo eliminado exitosamente'
        }
    } else {
        return {
            msg: 'error al intentar eliminar el empleo'
        }
    }
}

module.exports = {
    obtenerTodosLosEmpleos,
    obtenerEmpleoPorId,
    añadirNuevoEmpleo,
    editarEmpleo,
    eliminarEmpleo
}