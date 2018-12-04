// require('promise.prototype.finally').shim();

const axios = require('axios'),
    https = require('https'),
    omeIp = "100.73.32.21",
    omeUser = "admin",
    omePass = "Sq%9A&pEBP";

async function getMembers(omeIp,omeUser,omePass) {
    var reqs = [];
    await axios({
        method: 'get',
        url: `https://${omeIp}/redfish/v1/Systems/Members`,
        auth: {
            username: omeUser,
            password: omePass
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        headers: {'Self-Signed-Header': 'certificate'}
    }).then((res) => {
        value = res.data['value'];
        for(var key in value) {
            let member =  value[key]['@odata.id'];
            reqs.push(member);
        }
        return new Promise(() => console.log(reqs));
    }).catch((err) => {
        console.log(err);
    });
};

async function getMemberDetails(asdf) {

};

module.exports = {
    getMembers,
    getMemberDetails
};