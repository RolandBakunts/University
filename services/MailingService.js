// const config = require('../config');
// const mailgun = require('mailgun-js');

// const { apiKey, domainName } = config;
// const mg = mailgun({ apiKey: apiKey, domain: domainName });

// async function sendEmailConfirmation(userEmail, token) {
//     const url = 'localhost:3456/user/email-confirmation/' + token;
//     const data = {
//         template: 'email_confirmation',
//         from: 'rolandbakunts@gmail.com',
//         to: userEmail,
//         "recipient-variables": {
//             url
//         }
//     };
//     mg.messages().send(data, function (error, body) {
//         console.log('mail error ', error);
//     });
// }

// module.exports = { sendEmailConfirmation } 

