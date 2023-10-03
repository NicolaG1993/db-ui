/* TENERE FUNZIONI FORSE - MA ELIMINARE QUESTO FILE! */

import {
    getAllClips,
    getAllModels,
    getAllStudios,
    getAllDistributions,
    getAllCategories,
    getAllTags,
    getAllRecords,
    getAllRelations,
} from "@/src/lib/db/localDB";
import {
    importMovieRow,
    importActorRow,
    importStudioRow,
    importDistributionRow,
    importCategoryRow,
    importTagRow,
    importRecordRow,
    importRelationRow,
} from "@/src/lib/db/db";

// ELIMINARE!
async function handler(req, res) {
    let table = "records"; // 🧠
    try {
        if (table === "movies") {
            // GET DATA
            let { rows } = await getAllClips("");
            // console.log("rows!!", rows);
            // ADD DATA
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/movies/" +
                          row.pic.substring(
                              row.pic.indexOf("clips/") + "clips/".length
                          )
                        : null;
                    await importMovieRow(
                        row.title,
                        newPicURL,
                        row.rating,
                        row.url,
                        row.release,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "actors") {
            let { rows } = await getAllModels("");
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/actors/" +
                          row.pic.substring(
                              row.pic.indexOf("models/") + "models/".length
                          )
                        : null;
                    await importActorRow(
                        row.name,
                        newPicURL,
                        row.rating,
                        row.url,
                        row.release,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "studios") {
            let { rows } = await getAllStudios();
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/studios/" +
                          row.pic.substring(
                              row.pic.indexOf("studios/") + "studios/".length
                          )
                        : null;
                    await importStudioRow(
                        row.name,
                        newPicURL,
                        row.website,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "distributions") {
            let { rows } = await getAllDistributions();
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/distributions/" +
                          row.pic.substring(
                              row.pic.indexOf("distribution/") +
                                  "distribution/".length
                          )
                        : null;
                    await importDistributionRow(
                        row.name,
                        newPicURL,
                        row.website,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "categories") {
            let { rows } = await getAllCategories();
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/categories/" +
                          row.pic.substring(
                              row.pic.indexOf("categories/") +
                                  "categories/".length
                          )
                        : null;
                    await importCategoryRow(
                        row.name,
                        newPicURL,
                        row.type,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "tags") {
            let { rows } = await getAllTags();
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? "https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/tags/" +
                          row.pic.substring(
                              row.pic.indexOf("tags/") + "tags/".length
                          )
                        : null;
                    await importTagRow(
                        row.name,
                        newPicURL,
                        row.type,
                        row.created_at
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "records") {
            let { rows } = await getAllRecords();
            rows.map(async (row) => {
                try {
                    await importRecordRow(row.clipid, row.created_at);
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }

        if (table === "clipModelsRelation") {
            let { rows } = await getAllRelations(table);
            rows.map(async (row) => {
                try {
                    await importRelationRow(
                        row.clipid,
                        row.modelid,
                        "movie_actor",
                        "movieID",
                        "actorID"
                    );
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
            res.status(200).json(rows);
        }
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;
