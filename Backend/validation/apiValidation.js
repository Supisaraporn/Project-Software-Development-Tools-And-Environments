const { validationResult } = require("express-validator");

function apiValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        errorCode: 400,
        message: "The request body has " + errors.array().length + " error(s)",
      },
    });
  };
  next();
};

module.exports = apiValidation;