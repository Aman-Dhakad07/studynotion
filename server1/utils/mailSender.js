const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: "Study Notion <noreply@studynotion.com>",
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

    console.log("✅ Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Failed to send email:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
