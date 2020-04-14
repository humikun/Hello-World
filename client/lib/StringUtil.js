/**
 * StringUtil - Utils for String
 * Author: zwk
 * Version: 0.1
 */

var StringUtil = (function () {
    console.log('-------------------------------------util-------------------------------------')
    "use strict";
    var domainUri = 'https://zwk-playful-moose-388230-dev-ed.lightning.force.com/'

    function init() {
        console.log('StringUtil:[init]--->')
        // 
        console.log('<---StringUtil:[init]')
        return;
    }



    function getImgFromSfdc(imgStr) {
        return imgStr.replace(/\/resource/, domainUri+"resource");
    }


    // The public API
    return {
        init: init,
        getImgFromSfdc: getImgFromSfdc,
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