const { connect } = require("mongoose");

const connectionMongoDB = async () => {
  try {
    await connect(process.env.MONGOURI, {});
  } catch (e) {
    console.log("No se pudo establecer la conexión a la base de datos.");
  }
};

module.exports = { connectionMongoDB };
