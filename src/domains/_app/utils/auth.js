import axios from "axios";
import jwt from "jsonwebtoken";
import { getElementByID } from "@/src/application/db/db.js";

function signToken(user) {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        },
        process.env.COOKIE_SECRET,
        {
            expiresIn: "30d",
        }
    );
}

const isAuth = (handler) => {
    return async (req, res, next) => {
        // console.log("isAuth middleware activated");
        const { authorization } = req.headers; //passiamo token via headers (vedi placeorder.js)
        if (authorization) {
            //Bearer xxx => xxx
            const token = authorization.slice(7, authorization.length);
            jwt.verify(token, process.env.COOKIE_SECRET, (err, decode) => {
                if (err) {
                    res.status(401).send({
                        message:
                            "Il tuo token non é valido, non sei autorizzato a compiere questa azione",
                    });
                } else {
                    //decodificare token per avere i valori di user id, email e isAdmin
                    req.user = decode;
                    // console.log("isAuth req.user: ", req.user);
                    // next();
                    return handler(req, res);
                }
            });
        } else {
            res.status(401).send({
                message:
                    "Nessun token, non sei autorizzato a compiere questa azione",
            });
        }
    };
};

const isAdmin = (handler) => async (req, res, next) => {
    // console.log("isAdmin middleware activated");
    if (req.user.is_admin) {
        try {
            let { rows } = await getElementByID("users", req.user.id);
            if (rows[0].is_admin) {
                // next();
                return handler(req, res);
            } else {
                res.status(401).send({
                    message: "Devi essere un admin per compiere questa azione",
                });
            }
        } catch (err) {
            console.log("🐞 ERROR: ", err);
            res.status(500).send({ message: "Server: errore interno" });
        }
    } else {
        res.status(401).send({
            message: "Devi essere un admin per compiere questa azione",
        });
    }
};

export { signToken, isAuth, isAdmin };
