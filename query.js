const axios = require('axios'),
    https = require('https'),
    async = require('async');

let omeIp = "100.73.32.21",
    omeUser = "admin",
    omePass = "Sq%9A&pEBP"
axios({
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
    let sysCount = res.data['@odata.count'],
        x = 0,
        value = res.data['value'],
        members = [],
        reqs = [];
    console.log('System count is ', sysCount);
    while (x < sysCount) {
        member = value[x]['@odata.id'];
        members.push(member);
        x++;
    };
    async.each(members,(member,callback) => {
        console.log('Working on ', member);
        axios({
            method: 'get',
            url: `https://${omeIp}/${member}`,
            auth: {
                username: omeUser,
                password: omePass
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {'Self-Signed-Header': 'certificate'}
        }).then((res) => {
            reqs.push(res);
        }).catch((errorMessage) => {
            console.log(errorMessage);
            callback(errorMessage);
        });
    callback();
    },(err) => {
        console.log('finished with all callbacks');
        console.log(reqs);
    });
}).catch((errorMessage) => {
    console.log(errorMessage);
});
// url = "https://"+ome_ip+"/redfish/v1/"
// api = "https://"+ome_ip+"/api/DeviceService/"

// 'Systems/Members'

// Create new []
// while loop for members
// append members.id
// api + 'Devices(' + id + ')',
// idrac_ip = data["DeviceManagement"][0]["NetworkAddress"]
//             tag = data["DeviceSpecificData"]["serviceTag"]
//             if name != model+"-"+tag:
//                 if " (VRTX)" in model:
//                     name = model.strip(" (VRTX)")+"-"+tag
//                 else:
//                     name = model+"-"+tag
//             if " (VRTX)" in name:
//                 name = name.strip(" (VRTX)")
//                 dimmcount = int(data["DeviceSpecificData"]["populatedDIMMSlots"])
//             totalmem = int(data["DeviceSpecificData"]["totalMemory"])
//             dimmsize = str(totalmem / dimmcount)
//             dimmcount = str(dimmcount)
//             totalsize = str(totalmem / 1024)
//             slot = data["DeviceSpecificData"]["chassisSlot"]
//             slot = "N/A" if above reveals no MediaDeviceInfo
//             api + "Devices(" + id + ")/InventoryDetails('serverOperatingSystems')
//             os = data["InventoryInfo"][0]["OsName"] else No Os
//             api + "Devices(" + id + ")/InventoryDetails('serverDeviceCards')
//             while i < len(data["InventoryInfo"]):
//                     if "PERC" in data["InventoryInfo"][i]["Description"]:
//                         perc = perc + data["InventoryInfo"][i]["Description"] + ", "
//                     if "chipset" not in data["InventoryInfo"][i]["Description"]:
//                         if "P2P" not in data["InventoryInfo"][i]["Description"]:
//                             if "PCI" not in data["InventoryInfo"][i]["Description"]:
//                                 if "Xeon" not in data["InventoryInfo"][i]["Description"]:
//                                     if "Processor" not in data["InventoryInfo"][i]["Description"]:
//                                         pci = pci + data["InventoryInfo"][i]["Description"] + ","