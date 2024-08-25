import fs from "fs";
import S3 from "@/src/application/libs/s3";
import { IncomingForm } from "formidable";

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

// midleware to parse formData -> file
const asyncParse = (req) =>
    new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

export default async function handler(req, res) {
    try {
        const formData = await asyncParse(req);
        let { image } = formData.files;
        let { folder } = formData.fields;
        console.log("S3 single-upload: ", {
            formData,
            image,
            folder,
        });
        const allPromises = [];

        const { originalFilename, mimetype, size, filepath } = image[0];

        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            // ACL: "public-read",
            Key: `${folder}/${originalFilename}`,
            Body: fs.createReadStream(filepath),
            ContentType: mimetype,
            ContentLength: size,
        };

        const promise = S3.upload(uploadParams, (err, data) => {
            if (err) {
                console.log("reject", err);
                return err;
            } else {
                console.log("resolve", data);
                return data;
            }
        }).promise();
        allPromises.push(promise);

        Promise.all(allPromises)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log("🧡🧡🧡 UPLOAD ERROR lvl.2!!", err);
            });
    } catch (err) {
        res.status(500).send({
            message: ["Request error uploading image"],
            error: err,
        });
        console.log("🧡🧡🧡 UPLOAD ERROR lvl.1!!", err);
    }
}
