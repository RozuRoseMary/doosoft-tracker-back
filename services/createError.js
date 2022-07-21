module.exports = (errMessage, statusCode) => {
  const err = new Error(errMessage);
  err.statusCode = statusCode || 500;

  throw err;
};
