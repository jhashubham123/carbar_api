const pool = require('../utils/config/database');
let userModelObj = {};

/// Update password API
userModelObj.updatePassword = async function (req) {
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

userModelObj.userProfile = async function (req) {
    let returnData = {
        status: true,
        statusCode: 1,
        message: "Something went wrong",
        payload: {},
    }

    let user = req.user;
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
    returnData.message = "Profile retreive successfully";
    returnData.payload = {
        'data': {
            'firstName': insertData.rows[0].u_first_name,
            'lastName': insertData.rows[0].u_last_name,
            'email': insertData.rows[0].u_email,
            'phone': insertData.rows[0].u_phone,
            'userVerified': insertData.rows[0].u_verified,
        }
    };

    return returnData;


}


module.exports = userModelObj;