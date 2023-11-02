import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import { getUserByEmail } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { body, method } = req;
    const { email } = body;

    if (method === "POST") {
        try {
            let { rows } = await getUserByEmail(email);
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
                res.status(401).send({ message: "Invalid email" });
            }
        } catch (err) {
            res.status(500);
        }
    } else {
        res.status(404).send("Not found");
    }
}
