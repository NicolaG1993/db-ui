import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getDistributionByID } from "@/src/application/db/utils/item.js";
import { mapDistributionRawToDistribution } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        const { id } = req.query;
        try {
            await begin(client);
            let { rows } = await getDistributionByID(client, Number(id));
            let distribution = mapDistributionRawToDistribution(rows[0]);
            await commit(client);
            res.status(200).json(distribution);
        } catch (err) {
            await rollback(client);
            return res.status(500).json({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
