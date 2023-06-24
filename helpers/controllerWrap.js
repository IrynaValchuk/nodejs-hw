const controllerWrap = (controller) => {
  const func = async (reg, res, next) => {
    try {
      await controller(reg, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = controllerWrap;
