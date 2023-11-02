import axios from "axios";
// import S3 from "@/src/application/libs/s3.js";

export default async function fetchS3SettingsFile(fileURL) {
    try {
        let { data } = await axios.get(fileURL);
        return eval(data);
    } catch (error) {
        console.error("fetchS3SettingsFile error", error);
    }
}
