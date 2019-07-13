const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'dev';
console.log('Starting server with environment:', env);

const userHome =
    process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
console.log('Loading override configuration from path: ', userHome);

let result = dotenv.config({ path: userHome });
if (result.error) {
    console.log('No override configuration file found at given path!');
    // throw result.error;
}
const overrideConfig = result.parsed || {};
console.log('Override config:', overrideConfig);

result = dotenv.config();
if (result.error) {
    console.log('No .env file found!');
    // throw result.error;
}
const localConfig = result.parsed || {};
console.log('Loaded local config:', localConfig);

/*
NOTE: process.env has all the config variables required at the moment. 
Sequence of loading the config above ensures that ones in override file overrides the ones provided by local .env file.
*/
const finalConfig = process.env;
module.exports = finalConfig;
