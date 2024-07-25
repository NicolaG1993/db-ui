import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getUserByEmail } from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        const { email } = body;
        const client = await connect();
        try {
            await begin(client);
            let { rows } = await getUserByEmail(client, email);
            await commit(client);
            if (rows.length) {
                let user = rows[0];
                if (bcrypt.compareSync(req.body.password, user.psw)) {
                    const token = signToken(user);
                    res.send({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token: token,
                    });
                } else {
                    res.status(401).send({ message: "Invalid password" });
                }
            } else {
                // res.status(401).send({ message: "Invalid email" });
                res.status(404).send("User not found");
            }
        } catch (err) {
            await rollback(client);
            res.status(500);
        } finally {
            release(client);
        }
    } else {
        // res.status(404).send("Not found");
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
