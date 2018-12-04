const
    query = require('./query.js');

// Expect members to NOT be null
var members = query.getMembers_sync();
console.log(members);