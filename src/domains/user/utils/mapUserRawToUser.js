export default function mapUserRawToUser(rawUser) {
    return {
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        pic: rawUser.pic,
        password: rawUser.psw,
        isAdmin: rawUser.is_admin,
        createdAt: rawUser.created_at,
        emailVerified: rawUser.email_verified,
        verificationToken: rawUser.verification_token,
        passwordResetToken: rawUser.password_reset_token,
        passwordResetExpires: rawUser.password_reset_expires,
    };
}
