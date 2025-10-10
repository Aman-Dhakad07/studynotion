const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // tell Nodemailer to use Gmail
      host: "smtp.gmail.com",
      port: 587, // use STARTTLS, not SSL
      secure: false, // TLS will upgrade later
      auth: {
        user: process.env.MAIL_USER, // your Gmail address
        pass: process.env.MAIL_PASS, // your Gmail App Password
      },
      tls: {
        rejectUnauthorized: false, // prevent certificate rejection
      },
    });

    const info = await transporter.sendMail({
      from: `"Study Notion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.log("❌ Failed to send OTP:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
