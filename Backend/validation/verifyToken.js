const { isJwtExpired } = require("jwt-check-expiration");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (isJwtExpired(bearerHeader)) {
        res.status(401).json({
            success: false,
            error: {
                errorCode: 401,
                message: "token expired",
            },
        });
    } else if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({
            success: false,
            error: {
                errorCode: 401,
                message: "Unauthorized access",
            },
        });
  };
};

module.exports = verifyToken;