let verifyTokeObj = {};
let helper = require('../utils/common/helper');
const jwt = require('jsonwebtoken');


verifyTokeObj.verifyToken = function (req, res, next) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    const token = req.header('Authorization');

    if (!token) {
        returnData.message = "Token is required";
        returnData.statusCode = 5;
        helper.responseHandler(res, returnData);
    }

    const bearerToken = token.split(" ")[1];

    try {
        const decode = jwt.verify(bearerToken, process.env.SECRETKEY);
        req.user = decode.jwtPayload;
        next();
    } catch (error) {

        returnData.message = "Invalid token";
        returnData.statusCode = 5;
        helper.responseHandler(res, returnData);
    }
}

module.exports = verifyTokeObj;