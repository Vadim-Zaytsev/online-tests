const nodemailer = require('nodemailer');
const sendEmail = async (toEmail, subject, textContent) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ONLINE_TESTING,
            pass: process.env.PASSWORD_FROM_EMAIL_ONLINE_TESTING,
        }
    });

    const mailOptions = {
        from: 'online.testing.365@gmail.com',
        to: toEmail,
        subject,
        text: textContent,
    };

    transporter.sendMail(mailOptions)
};

module.exports = {
    sendEmail,
};
