const pool = require('../utils/config/database');
const mobileOtpHandle = require("../utils/common/mobileOtpHandler");
let jwt = require("jsonwebtoken");
let authModelObj = {};






authModelObj.sendRegistrationOtp = async function (data) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: 'Something went wrong',
        payload: {},
    }

    let otp;

    try {
        let query = ``;
        let insertData;
        query = `SELECT * FROM users WHERE u_email='${data.email}'`;
        insertData = await pool.query(query);
        if (insertData.rowCount > 0) {
            if (insertData.rows[0].u_isVerified == false) {
                returnData.message = 'User unverified';
            } else {
                returnData.message = 'User is already registered';

            }
        } else {
            otp = await mobileOtpHandle.generateOtp(data.email);
            query = `INSERT INTO users(u_email,u_password,otp)VALUES($1,$2,$3)`;
            insertData = pool.query(query, [data.email, data.password, otp]);
            returnData.message = "OTP sent successfully";
            returnData.payload = {
                OTP: otp
            }

        }




        return returnData;
    } catch (e) {
    }


}

authModelObj.verifyOtp = async function (data) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }
    let generatedToken;
    let query = ``;
    let insertData;

    query = `SELECT * FROM users WHERE u_email='${data.email}'`;
    insertData = await pool.query(query);
    if (insertData.rowCount > 0) {
        if (insertData.rows[0].otp == data.otp) {


            query = `UPDATE users SET u_verified=true,otp='0' WHERE u_email='${data.email}'`;
            await pool.query(query);

            jwtPayload = {
                userId: insertData.rows[0].u_id,
                userEmail: insertData.rows[0].u_email
            }

            generatedToken = jwt.sign({ jwtPayload }, process.env.SECRETKEY)
            returnData.message = "OTP verified successfully";
            returnData.payload = {
                user: jwtPayload,
                token: generatedToken
            }
        } else {
            returnData.status = false,
                returnData.statusCode = 0,
                returnData.message = "Invalid otp";
        }
    } else {
        returnData.message = "User not found"
    }
    return returnData;
}


/// Auth login API

authModelObj.loginUser = async function (data) {

    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }
    let otp;
    let generatedToken;
    let query = ``;
    let insertData;

    query = `SELECT * FROM users WHERE u_email='${data.email}'`;
    insertData = await pool.query(query);
    if (insertData.rowCount > 0) {
        if (!insertData.rows[0].u_verified && insertData.rows[0].u_password == data.password) {
            otp = await mobileOtpHandle.generateOtp(data.email);
            query = `UPDATE users SET otp=${otp} WHERE u_email='${data.email}'`;
            insertData = await pool.query(query);
            returnData.message = "OTP send successfully";
            returnData.payload = {
                'otp': otp
            }
        } else if (insertData.rows[0].u_password != data.password) {
            returnData.message = "Password does not match";
        }

        else {
            jwtPayload = {
                userId: insertData.rows[0].u_id,
                userEmail: insertData.rows[0].u_email
            }

            generatedToken = jwt.sign({ jwtPayload }, process.env.SECRETKEY)
            returnData.message = "user logged in successfully";
            returnData.payload = {
                user: jwtPayload,
                token: generatedToken
            }
        }
    } else {
        returnData.message = "User not registered";
    }
    return returnData;
}


/// Send OTP API
authModelObj.sendOtp = async function (data) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }

    let otp;
    let query = ``;
    let insertData;

    if (data.email == "admin@yopmail.com") {
        otp = '424242'
    } else {
        query = `SELECT * FROM users WHERE u_email='${data.email}'`;
        insertData = await pool.query(query);
        if (insertData.rowCount > 0) {
            otp = await mobileOtpHandle.generateOtp(data.email);
            query = `UPDATE users SET otp=${otp} WHERE u_email='${data.email}'`;
            insertData = await pool.query(query);
            returnData.message = "Otp has been sent to your registered emailid"

        } else {
            returnData.message = "User does not exist"
        }
    }

    returnData.payload = {
        'OTP': otp
    }

    return returnData;
}

/// Forgot password API
authModelObj.forgotPassword = async function (data) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }

    let query = ``;
    let insertData;
    query = `SELECT * FROM users WHERE u_email='${data.email}'`;
    insertData = await pool.query(query);
    if (insertData.rowCount > 0) {
        if (insertData.rows[0].otp == data.otp) {
            query = `UPDATE users SET u_password='${data.password}',otp='0' WHERE u_email='${data.email}'`;
            await pool.query(query);
            returnData.message = "Password changed successfully";
        } else {
            returnData.message = "OTP does not match";
        }


    } else {
        returnData.message = "User does not match, Please contact admin";
    }
    return returnData;

}

/// Update password API
authModelObj.updatePassword = async function (req) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }
    let user = req.user;
    let data = req.body;
    let query = ``;
    let insertData;

    query = `SELECT * FROM users WHERE u_id=${user.userId}`;
    insertData = await pool.query(query);
    if (!insertData.rowCount > 0) {
        returnData.status = false;
        returnData.message = "User not found";
        returnData.status = 0;
        return returnData;
    }

    if (data.currentPassword != insertData.rows[0].u_password) {
        returnData.status = false;
        returnData.message = "Current password does not match";
        returnData.status = 0;
        return returnData;
    }

    query = `UPDATE users SET u_password='${data.newPassword}'`;
    await pool.query(query);
    returnData.message = "Password updated succcesfully";
    return returnData;
}

module.exports = authModelObj;