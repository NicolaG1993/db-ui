import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import {
    begin,
    commit,
    rollback,
    // release,
    // connect,
} from "@/src/application/db/db.js";
import { newUser, getUserByEmail } from "@/src/application/db/utils/user.js";
import { createNewUserSettings } from "@/src/application/db/utils/settings.js";
import sendVerificationEmail from "@/src/domains/_app/components/Auth/utils/sendVerificationEmail";

export default async function createUser(client, name, email, password) {
    try {
        await begin(client);

        // Check if email already exists
        const existingEmail = await getUserByEmail(client, email);
        if (existingEmail.rowCount > 0) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = signToken(email);

        // register new user
        const response = await newUser(
            client,
            name,
            email,
            hashedPassword,
            verificationToken
        );
        let user = response.rows[0];
        await createNewUserSettings(client, user.id);

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        await commit(client);
        return user;
    } catch (err) {
        await rollback(client);
        throw err;
    }
}
