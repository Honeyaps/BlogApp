const nodemailer = require('nodemailer');

require("dotenv").config()

function sendEmail({ email, OTP }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,  // nodemailer app email-pass
            },
        });

        var mailConfig = {
            from: process.env.EMAIL,
            to: email,
            subject: "PASSWORD RECOVERY",
            html: `<h1>Hello, ${email}</h1>
                   <h2>Your OTP is ${OTP}</h2>`
        }

        transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                reject({ msg: "ERROR" });
            } else {
                resolve({ msg: "OTP sent" });
            }
        });
    });
}

module.exports = { sendEmail };