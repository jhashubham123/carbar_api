let helperObj = {};

helperObj.responseHandler = function (res, options) {
    let obj = {
        status: (options && options.status) || false,
        statusCode: (options && options.statusCode) || 0,
        message: (options && options.message) || "Something went wrong, Please contact admin",
        payload: (options && options.payload) || {}
    }
    res.status(200).json(obj);
}

module.exports = helperObj;