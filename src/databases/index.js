const { MongoClient } = require('mongodb');

const getConnectionDb = async ()=> {
  try {
    const client = await MongoClient.connect('string de conexion', { useUnifiedTopology: true });
    console.log('¡Conexion exitosa!')
    return client.db('web_act4')
  } catch(e){
    console.error('¡Conexion con base de datos ha fallado!',e)
  }
}

module.exports = { getConnectionDb }