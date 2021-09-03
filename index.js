if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { connectionMongoDB } = require("./api/configs/database");

const app = express();

app.set("PORT", process.env.PORT);
app.set("APIVERSION", process.env.APIVERSION);
app.set("NODE_ENV", process.env.NODE_ENV);

//realizamos nuestra conexión a la base de datos.
connectionMongoDB();

//para poder obtener los datos de la solicitud en formato json
app.use(cors());
app.use(express.json());

//first route method
app.use(
  `/api/${app.get("APIVERSION")}/tasks`,
  require("./api/routes/task.router")
);

//ponemos a la escucha el server para poder aceptar las peticiones de los usuarios.
app.listen(app.get("PORT"), () => {
  console.log(`Se está escuchando en el puerto: ${app.get("PORT")}`);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (app.get("NODE_ENV") === "development") {
    res.send({
      message: error.message,
      stack: error.status ? undefined : error.stack,
    });
  } else {
    res.send({
      message: error.stack
        ? "Ocurrió un error en el servidor, inténtelo más tarde o póngase en contacto con el administrador"
        : message,
    });
  }
});
