const mongoose = require('mongoose');

dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log('db online');
  } catch (error) {
    console.log(error);
    throw new Error('error al inicializar las conexion a base datos');
  }
};

module.exports = { dbConnection };
