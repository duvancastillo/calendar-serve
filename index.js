const express = require('express');
var cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//creando app de express

const app = express();

//conexion a base de datos
dbConnection();
//cosr
app.use(cors());

//directorio public
app.use(express.static('public'));

//lectura y parseo del boxy
app.use(express.json());
//rutas
app.use('/api/auth/', require('./routes/auth'));

//puerto de escucha

app.listen(process.env.PORT, () => {
  console.log(`el servidor esta escuchando por ${process.env.PORT}`);
});
