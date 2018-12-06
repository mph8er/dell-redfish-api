// require('promise.prototype.finally').shim();

const axios = require('axios'),
    https = require('https');

function getInventory(omeIp, omeUser, omePass) {
    //https://100.73.32.21/api/DeviceService/Devices
    var reqs = [];
    return axios({
        method: 'get',
        url: `https://${omeIp}/api/DeviceService/Devices`,
        auth: {
            username: omeUser,
            password: omePass
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        headers: { 'Self-Signed-Header': 'certificate' }
    }).then((res) => {
        var {value} = res.data;
        devIds = [];
        for (var key in value) {
            reqs.push({
                    Id: value[key].Id,
                    DevType: value[key].Type,
                    ServiceTag: value[key].DeviceServiceTag,
                    ChassisTag: value[key].ChassisServiceTag,
                    Model: value[key].Model,
                    ConStatus: value[key].ConnectionState,
                    LastInventory: value[key].LastInventoryTime,
                    LastStatusChk: value[key].LastStatusTime,
                    MgmtAddress: value[key].DeviceManagement[0].NetworkAddress,
                    MgmtMACAdd: value[key].DeviceManagement[0].MacAddress,
                    MgmtHostName: value[key].DeviceManagement[0].DnsName,
                    MgmtProfile: value[key].DeviceManagement[0].ManagementProfile,
            });
            devIds.push(value[key].Id);
        }
        return axios.all(devIds.map((res) => {
            return axios({
                method: 'get',
                url: `https://${omeIp}/api/DeviceService/Devices(${res})/InventoryDetails`,
                auth: {
                    username: omeUser,
                    password: omePass
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                }),
                headers: { 'Self-Signed-Header': 'certificate' }
            }).catch((err) => {
                return (err);
            });
        })).then((res) => {
            var {inventoryData} = res.data;
            for (var key in value) {
                reqs[key].push({inventoryDetail: inventoryData[key]});
            }
        }).catch((err) => {
            return (err);
        });
    }).catch((err) => {
        return err;
    });
}

module.exports = {
    getInventory
};