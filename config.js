const dotenv = require('dotenv');
dotenv.config();

const {
    JWT_SECRET: jwtSecret,
    APIkey: apiKey,
    DomainName: domainName
} = process.env;

module.exports = {
    jwtSecret,
    apiKey,
    domainName,
}