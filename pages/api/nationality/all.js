import allNationalities from "@/utils/allNationalities";

export default async function handler(req, res) {
    res.status(200).send(allNationalities);
}
