import jwt from "jsonwebtoken";
// import {
//     begin,
//     commit,
//     rollback,
//     release,
//     connect,
// } from "@/src/application/db/db.js";
// import { getElementByID } from "@/src/application/db/utils/utils.js";

function signToken(email) {
    return jwt.sign(
        {
            email,
        },
        process.env.COOKIE_SECRET, // 🔴 We should have JWT_SECRET here
        {
            expiresIn: "30d",
        }
    );
}

function signTokenShort(email) {
    return jwt.sign(
        {
            email,
        },
        process.env.COOKIE_SECRET, // 🔴 We should have JWT_SECRET here
        {
            expiresIn: "1h",
        }
    );
}

function verifyToken(token) {
    return jwt.verify(token, process.env.COOKIE_SECRET); // 🔴 We should have JWT_SECRET here
}

/*
const isAuth = (handler) => {
    return async (req, res, next) => {
        if (req.method === "POST") {
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
        } else {
            res.status(405).json({
                success: false,
                error: "Method Not Allowed",
            });
        }
    };
};
*/

/*
const isAdmin = (handler) => async (req, res, next) => {
    if (req.method === "POST") {
        // console.log("isAdmin middleware activated");
        if (req.user.is_admin) {
            try {
                let { rows } = await getElementByID(
                    client,
                    "users",
                    req.user.id
                );
                if (rows[0].is_admin) {
                    // next();
                    return handler(req, res);
                } else {
                    res.status(401).send({
                        message:
                            "Devi essere un admin per compiere questa azione",
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
    } else {
        res.status(405).json({
            success: false,
            error: "Method Not Allowed",
        });
    }
};
*/

export {
    signToken,
    signTokenShort,
    verifyToken,
    // isAuth,
    //  isAdmin
};
