const nodemailer = require("nodemailer")

async function sendOtpMail(email, otp) {
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
        console.log("OTP email sent successfully")

    } catch (err) {
        console.error("Error sending OTP email:", err.message)
        throw err   // so calling function knows it failed
    }
}

module.exports = sendOtpMail
