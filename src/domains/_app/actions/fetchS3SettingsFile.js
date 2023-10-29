import axios from "axios";
// import S3 from "@/src/application/libs/s3.js";

export default async function fetchS3SettingsFile(fileURL) {
    console.log("fetchS3SettingsFile invoked");
    try {
        let { data } = await axios.get(fileURL);
        // console.log("axios fetch: ", eval(data));
        return eval(data);
    } catch (error) {
        console.error("fetchS3SettingsFile error", error);
        // return standardSettings
    }
}
