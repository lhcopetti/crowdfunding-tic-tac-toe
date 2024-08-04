
import { S3Client } from "@aws-sdk/client-s3";

const LOCALSTACK_S3_URL = "http://s3.localhost:4566";

const buildS3Client = () => {

    if (process.env.NODE_ENV === "development") {
        return new S3Client({ endpoint: LOCALSTACK_S3_URL });
    }

    return new S3Client();
}

const gameStateBucketName = "crowd-sourced-tic-tac-toe";
const gameStateBucketKey = "game-state.json";

module.exports = {
    buildS3Client,
    gameStateBucketName,
    gameStateBucketKey
}