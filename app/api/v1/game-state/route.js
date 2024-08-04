
import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import awsConfig from '../../../awsConfig';

const s3Client = awsConfig.buildS3Client();

export async function GET() {

    try {
        const command = new GetObjectCommand({
            Bucket: awsConfig.gameStateBucketName,
            Key: awsConfig.gameStateBucketKey
        });
        const response = await s3Client.send(command);
        const data = await response.Body.transformToString();
        return NextResponse.json(JSON.parse(data));
    }
    catch (error) {
        console.log('S3 Storage error: ', error);
        return NextResponse.json({ error: 'S3 Storage error: ' + error.message }, { status: 500 });
    }
}