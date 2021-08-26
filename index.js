require("dotenv").config();

const express = require("express");

const app = express();

//para poder obtener los datos de la solicitud en formato json
app.use(express.json());

//first route method
app.use(
  `/api/${process.env.APIVERSION}/tasks`,
  require("./api/routes/task.router")
);

//ponemos a la escucha el server para poder aceptar las peticiones de los usuarios.
app.listen(process.env.PORT, () => {
  console.log(`Se está escuchando en el puerto: ${process.env.PORT}`);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    message: error.message,
    stack: error.status ? undefined : error.stack,
  });
});
