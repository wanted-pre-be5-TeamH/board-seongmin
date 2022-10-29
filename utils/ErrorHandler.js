const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const status = err?.status || 500;
  const message = err?.message || "INTERNAL_SERVER_ERROR";

  return res.status(status).json({ message });
};

module.exports = {
  catchAsync,
  errorHandler,
};
