import nodemailer from "nodemailer";

const sendResetPswEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password reset",
        text: `Please reset your password by clicking the link: ${process.env.BASE_URL}/account/reset-psw/${token}`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendResetPswEmail;
