const env = process.env.NODE_ENV || 'dev';
const dbURI = `mongodb://localhost:27017/worldwide-${env}`;
const port = 4000;
const secret = 'Xy.Two-und-h4lf-T0w3rs';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;


module.exports = { dbURI, port, secret, accountSid, authToken };
