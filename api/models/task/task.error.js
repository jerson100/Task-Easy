class NotFoundTaskError extends Error {
  constructor(msg = "No se encontró la tarea") {
    super(msg);
    this.status = 404;
    this.name = "NotFoundTaskError";
  }
}

class ExistsTaskException extends Error {
  constructor(message = "La tarea ya existe") {
    super(message);
    this.status = 400;
    this.name = "ExistsTaskException";
  }
}

class ClientRequestTaskError extends Error {
  constructor(
    msg = "La solicitud no es la correcta, no se puede procesar la petición"
  ) {
    super(msg);
    this.name = "ClientRequestTaskError";
    this.status = 400;
  }
}

module.exports = {
  NotFoundTaskError,
  ClientRequestTaskError,
  ExistsTaskException,
};
