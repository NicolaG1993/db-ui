import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newUser, getUserByEmail } from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    if (method === "POST") {
        const { body, method } = req;
        const { name, email, password } = body;
        const client = await connect();
        try {
            await begin(client);

            const hashedPsw = bcrypt.hashSync(password);
            // check unique email
            const existingEmail = await getUserByEmail(client, email);
            if (existingEmail.rows.length) {
                return res
                    .status(500)
                    .json({ message: "Questa email è già in utilizzo" });
            } else {
                // register new user
                const response = await newUser(client, name, email, hashedPsw);
                await commit(client);

                let user = response.rows[0];
                const token = signToken(user);

                res.send({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token,
                });
            }
        } catch (err) {
            // res.status(500).json({ message: "Error occured." });
            await rollback(client);
            res.status(500);
        } finally {
            release(client);
        }
    } else {
        // Return 404 if someone pings the API with a method other than POST
        res.status(404).send("Not found");
    }
}
