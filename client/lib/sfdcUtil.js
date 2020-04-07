/**
 * sfdcUtil - REST toolkit for Salesforce metadata
 * Author: zwk
 * Version: 0.1
 */

var sfdcUtil = (function () {
    console.log('-------------------------------------util-------------------------------------')
    "use strict";


    function init() {
        console.log('sfdcUtil:[init]--->')
        // 
        console.log('<---sfdcUtil:[init]')
    }



    function getStaticResource(name, success, error) {
        var queryStr = "SELECT" +
            " Id," +
            "Name," +
            "Body " +
            "FROM StaticResource " +
            "WHERE Name='" + name + "'";
        force.query(queryStr, success, error);
    }


    // The public API
    return {
        init: init,
        // login: login,
        // getUserId: getUserId,
        // isLoggedIn: isLoggedIn,
        // request: request,
        // query: query,
        // create: create,
        // update: update,
        // del: del,
        // upsert: upsert,
        // retrieve: retrieve,
        // discardToken: discardToken,
        // oauthCallback: oauthCallback
    };

})();