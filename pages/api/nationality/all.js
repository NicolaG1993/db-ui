import allNationalities from "@/src/application/settings/allNationalities";

export default async function handler(req, res) {
    res.status(200).send(allNationalities);
}
