const processError = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res);
    } catch (e) {
      next(e);
    }
  };
};

module.exports = {
  processError,
};
