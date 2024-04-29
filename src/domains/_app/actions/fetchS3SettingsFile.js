import { getError } from "@/src/application/utils/error";
import axios from "axios";
// import S3 from "@/src/application/libs/s3.js";

export default async function fetchS3SettingsFile(fileURL) {
    try {
        let { data } = await axios.get(fileURL);
        return { status: 200, data: eval(data) };
    } catch (error) {
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
}
