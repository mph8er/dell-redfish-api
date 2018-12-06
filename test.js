const {getInventory} = require('./functions.js');
const axios = require('axios'),
    https = require('https');

var omeIp = "100.73.32.21",
omeUser = "admin",
omePass = "Sq%9A&pEBP",
config = {
            auth: {
                username: omeUser,
                password: omePass
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: { 'Self-Signed-Header': 'certificate' }
        };
getInventory(omeIp,omeUser,omePass).then((res) => {
    console.log(JSON.stringify(res,undefined,2));
});