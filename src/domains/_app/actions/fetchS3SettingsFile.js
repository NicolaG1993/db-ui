import { getError } from "@/src/application/utils/error";
// import S3 from "@/src/application/libs/s3.js";
// import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import axios from "axios";

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
