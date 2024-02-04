let userModel = require("../model/userModel");
let helper = require("../utils/common/helper")

let userControllerObj = {};


/// Update password API
userControllerObj.updatePassword = async function (req, res) {

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
    let returnDataFromModel = await userModel.updatePassword(req);
    helper.responseHandler(res, returnDataFromModel);
}


userControllerObj.userProfile = async function (req, res) {
    let returnData = {
        status: false,
        statusCode: 0,
        message: "Something went wrong"
    };
    let data = req.body;
    let returnDataFromModel = await userModel.userProfile(req);
    helper.responseHandler(res, returnDataFromModel);

}

module.exports = userControllerObj;