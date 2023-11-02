import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import { newUser, getUserByEmail } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { body, method } = req;
    const { name, email, password } = body;

    if (method === "POST") {
        try {
            const hashedPsw = bcrypt.hashSync(password);
            // check unique email
            const existingEmail = await getUserByEmail(email);
            if (existingEmail.rows.length) {
                return res
                    .status(500)
                    .json({ message: "Questa email è già in utilizzo" });
            } else {
                // register new user
                const response = await newUser(name, email, hashedPsw);
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
            res.status(500);
        }
    } else {
        // Return 404 if someone pings the API with a method other than POST
        res.status(404).send("Not found");
    }
}
