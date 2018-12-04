// require('promise.prototype.finally').shim();

const axios = require('axios'),
    https = require('https');

    function getMembers(omeIp, omeUser, omePass) {
        return axios({
            method: 'get',
            url: `https://${omeIp}/redfish/v1/Systems/Members`,
            auth: {
                username: omeUser,
                password: omePass
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                'Self-Signed-Header': 'certificate'
            }
        }).then((res) => {
            var reqs = [];
            value = res.data['value'];
            for (var key in value) {
                let member = value[key]['@odata.id'];
                reqs.push(member);
            }
          return reqs;
        }).catch((err) => {
          console.log(err);
        });
      };

module.exports = {
    getMembers,
};