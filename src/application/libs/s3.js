import AWS from "aws-sdk";

// create S3 instance with credentials
AWS.config.update({
    accessKeyId: process.env.REACT_AWS_KEY,
    secretAccessKey: process.env.REACT_AWS_SECRET,
    // region: "eu-center-1",
});
const S3 = new AWS.S3();

export default S3;
