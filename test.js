const {getMembers} = require('./functions.js');

var omeIp = "100.73.32.21",
omeUser = "admin",
omePass = "Sq%9A&pEBP";

getMembers(omeIp,omeUser,omePass).then((res) => console.log(res));