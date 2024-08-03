import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, token) => {
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
        subject: "Verify your email address",
        text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/account/verify?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
