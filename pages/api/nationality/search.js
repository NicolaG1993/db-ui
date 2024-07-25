import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getRelationsBySearch } from "@/src/application/db/utils/utils.js";
import allNationalities from "@/src/application/settings/allNationalities";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let { str } = req.query;
        if (!str) {
            str = "";
        }

        const client = await connect();
        try {
            await begin(client);
            // const { rows } = await getAllNationalitiesRelations(str);
            const { rows } = await getRelationsBySearch(
                client,
                str,
                "nationalityRelation",
                "nationality"
            );
            await commit(client);
            let relations = rows;
            // console.log("relations: ", relations);

            // filter only nations with relations
            let onlyDataWithRelations = allNationalities.filter((el) =>
                relations.find((it) => it.nationality === el.name)
            );

            // onlyDataWithRelations = sortByObjValue(
            //     onlyDataWithRelations,
            //     order,
            //     "asc"
            // ); // fare in component

            // console.log("onlyDataWithRelations: ", onlyDataWithRelations);
            // for every nation count how many relations they have for every type
            let dataWithInfos = onlyDataWithRelations.map((el) => {
                let actors = 0;
                let studios = 0;
                let distributions = 0;

                relations.map((it) => {
                    if (it.nationality === el.name) {
                        it.actorid && actors++;
                        it.studioid && studios++;
                        it.distributionid && distributions++;
                    }
                });

                return { ...el, actors, studios, distributions };
            });
            // console.log("dataWithInfos: ", dataWithInfos);

            // tornare onlyDataWithRelations (nationalieties + relations)
            res.status(200).send(dataWithInfos);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(500).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

// vogliamo solo nationalities presenti in "nationalitiesRelation"
// con le seguenti relations: actors, studios, distribution

// sarebbe da creare un API esterna per nations, che torni nation, nationality, code e flag pic
// es. la API che feci "Music News"
