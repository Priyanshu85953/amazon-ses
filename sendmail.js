const AWS = require('aws-sdk');
require('dotenv').config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendMail = async (recipientEmail, name, emailBody) => {
    const params = {
        Source: process.env.AWS_SES_SENDER,
        Destination: {
            ToAddresses: [recipientEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailBody,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Quiz Results for ${name}`,
            },
        },
    };

    try {
        const res = await AWS_SES.sendEmail(params).promise();
        console.log('Email has been sent!', res);
    } catch (error) {
        console.log(error);
    }
};

// No call to sendMail here, it will be imported and used by javascript.js
module.exports = sendMail;
