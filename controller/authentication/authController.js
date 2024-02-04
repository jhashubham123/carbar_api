let authModel = require("../../model/authModel");
let helper = require("../../utils/common/helper")

let authControllerObj = {};


/// Auth register API

authControllerObj.registerUser = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };

    let data = req.body;

    if (!data.firstName) {
        returnData.message = "firstName field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    if (!data.lastName) {
        returnData.message = "lastName field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    if (!data.phone) {
        returnData.message = "phone field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    if (!data.email) {
        returnData.message = "email field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    if (!data.password) {
        returnData.message = "password field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    let returnDataFromModel = await authModel.sendOtp(data);
    helper.responseHandler(res, returnDataFromModel);
}

/// Auth verify OTP API

authControllerObj.verifyOtp = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    let data = req.body;

    if (!data.email) {
        returnData.message = "email field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    if (!data.otp) {
        returnData.message = "otp field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    let returnDataFromModel = await authModel.verifyOtp(data);
    helper.responseHandler(res, returnDataFromModel);
}

/// Auth login API
authControllerObj.loginUser = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    let data = req.body;

    if (!data.email) {
        returnData.message = "email field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    if (!data.password) {
        returnData.message = "password field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    let returnDataFromModel = await authModel.loginUser(data);
    helper.responseHandler(res, returnDataFromModel);
}

/// Send OTP API
authControllerObj.sendOtp = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    let data = req.body;

    if (!data.email) {
        returnData.message = "email field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    let returnDataFromModel = await authModel.sendOtp(data);
    helper.responseHandler(res, returnDataFromModel);
}

/// Forgot password API
authControllerObj.forgotPassword = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };

    let data = req.body;
    if (!data.email) {
        returnData.message = "email field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    if (!data.otp) {
        returnData.message = "otp field is required";
        helper.responseHandler(res, returnData);
        return;
    }

    if (!data.password) {
        returnData.message = "password field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    let returnDataFromModel = await authModel.forgotPassword(data);
    helper.responseHandler(res, returnDataFromModel);

}

/// Update password API
authControllerObj.updatePassword = async function (req, res) {

    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    let data = req.body;
    if (!data.currentPassword) {
        returnData.message = "currentPassword field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    if (!data.newPassword) {
        returnData.message = "newPassword field is required";
        helper.responseHandler(res, returnData);
        return;
    }
    let returnDataFromModel = await authModel.updatePassword(req);
    helper.responseHandler(res, returnDataFromModel);
}


module.exports = authControllerObj;