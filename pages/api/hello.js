// import {} from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        res.send("hello");
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}
