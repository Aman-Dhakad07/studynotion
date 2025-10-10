const axios = require("axios");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: title,
        html: body,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent via Resend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send email via Resend:", error.response?.data || error.message);
    return error.message;
  }
};

module.exports = mailSender;
