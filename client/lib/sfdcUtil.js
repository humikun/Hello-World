/**
 * sfdcUtil - REST toolkit for Salesforce metadata
 * Author: zwk
 * Version: 0.1
 */

var sfdcUtil = (function () {
    console.log('-------------------------------------util-------------------------------------')




    function getStaticResource(name, success, error) {
        var queryStr = "SELECT" +
            " Id," +
            "Name," +
            "Body " +
            "FROM StaticResource " +
            "WHERE Name='" + name + "'";
        force.query(queryStr, success, error);
    }



})();