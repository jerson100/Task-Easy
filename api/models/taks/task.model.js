const { Schema, model } = require("mongoose");

//Todo inicia con un Schema
//Los esquemas definenen la estructura o la forma
//de los documentos dentro de las colecciones.
//los esquemas se asocian a las colecciones.
const TaskSchema = new Schema({
  title: String,
  description: String,
  color: String,
});

//compilamos el modelo.
const Task = model("Task", TaskSchema);

module.exports = Task;
