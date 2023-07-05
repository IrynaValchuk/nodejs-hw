const handleMongooseError = (error, _, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  if (error.keyPattern.email === 1) {
    error.message = "Error: Field email must be unique.";
  }
  if (error.keyPattern.phone === 1) {
    error.message = "Error: Field phone must be unique.";
  }
  next();
};

module.exports = handleMongooseError;
