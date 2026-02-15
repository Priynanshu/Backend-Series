const nodemailer = require("nodemailer")
require("dotenv").config()
const fs = require("fs")
const path = require("path")
const handlebars = require("handlebars")

async function emailVerification(token, email) {
    try {
        const emailTemplateSource = fs.readFileSync(
            path.join(__dirname, "template.hbs"),
            "utf-8"
        )

        const template = handlebars.compile(emailTemplateSource)
        const htmlToSend = template({
            token: encodeURIComponent(token)
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailConfiguration = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification",
            html: htmlToSend
        }

        const info = await transporter.sendMail(mailConfiguration)
        console.log("Email sent successfully")
        console.log(info.response)

    } catch (error) {
        console.error("Email send error:", error.message)
    }
}

module.exports = { emailVerification }
