'use strict';
var path = require('path');

var common = {
    env: process.env.NODE_ENV,
    root: path.normalize(`${__dirname}/../../..`),
    browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
    port: process.env.PORT || 9001,
    ip: process.env.IP || '0.0.0.0',
    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`
    }
};

module.exports = common;