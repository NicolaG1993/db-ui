import { getDistributionByID } from "@/src/application/db/db.js";
import { mapDistributionRawToDistribution } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        let { rows } = await getDistributionByID(Number(id));
        let distribution = mapDistributionRawToDistribution(rows[0]);
        res.status(200).json(distribution);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
