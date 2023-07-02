const handleMongooseError = (error, _, next) => {
  error.status = 400;
  if (error.keyPattern.email === 1) {
    error.message = "Error: Field email must be unique.";
  }
  if (error.keyPattern.phone === 1) {
    error.message = "Error: Field phone must be unique.";
  }
  next();
};

module.exports = handleMongooseError;
