const nodemailer = require("nodemailer")

async function sendingOTP(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD
                    }
                })
        
                const mailOptions = {
                    from: process.env.MAIL_USER,
                    to: email,
                    subject: "Password reset OTP",
                    html: `
                        <p>Your OTP for password reset is:</p>
                        <h2>${otp}</h2>
                        <p>It is valid for <b>10 minutes</b>.</p>
                    `
                }

        await transporter.sendMail(mailOptions)
        console.log("OTP sent successfully")
    }catch(err) {
        console.log("error from sending otp: ", err)
    }
}

module.exports = sendingOTP