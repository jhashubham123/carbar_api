const mobileOtpObj = {};
let nodeMailer = require("nodemailer");


mobileOtpObj.generateOtp = async function (email) {
    let generateOtp = Math.floor(100000 + Math.random() * 900000);
    await mobileOtpObj.sendOtpToEmail(email, generateOtp);
    return generateOtp;
}

mobileOtpObj.sendOtpToEmail = async function (email, otp) {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            }
        })
        const mailOtptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your one time password",
            text: `Your one time password is ${otp}`
        }

        await transporter.sendMail(mailOtptions);
        console.log('Mail sent sucessfully');
    } catch (e) {
        console.log("Error sending OTP", e);
    }
}

module.exports = mobileOtpObj;