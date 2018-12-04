require('promise.prototype.finally').shim();
// Libraries
const axios = require('axios'),
    https = require('https'),
    sleep = require('system-sleep');
// Persistant variables - Function module globals
const omeIp = "100.73.32.21",
    omeUser = "admin",
    omePass = "Sq%9A&pEBP";
sync_check = function(timeout, time, check){
    if(check){ return true; }
    if(timeout < time){
        setTimeout(function(){
            var timesf = (new Date()).getTime()
        }, 1000);
        sync_check(timeout, timesf, check);
    }
    else { throw "Request timed out!"; return false; }
}

// Convert async functions into syncronous ones
// This isn't recommended and is a very bad practice when building node apps
// However, this is how it's done!
getMembers_sync = function(){
    // Function specific variables
    var 
        running = true,
        results = [],
        timeout = (new Date()).getTime() + 30000;

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
            results = res;
        }).catch((err) => {
            throw `Error occured on getMember attempt:: ${err}`;
        }).finally(()=> {
            running = false;
            console.log("Returned stuff!");
        })
    
    
    while(running == true){
        // Do nothing, block execution until run is complete.
        // This is a really bad practice since it defeats the purpose of async programming!
        sleep(100);
        if ( (new Date()).getTime() >= timeout ) {
            throw 'Request timed out';
            running = false;
        }
    }
    

    // sync_check(timeout,(new Date()).getTime(),running);
    return results;
}

module.exports = {"getMembers_sync": getMembers_sync}