function getRRKList(success, error) {
  var soql = "select Id, Name, dishes_recode_name__c, dishes_des_recode_name__c, dishes_img__c FROM menu__c";
  force.query(soql, success, error);
}

function getRRKDetails(rrkid, success, error) {
  var soql = "SELECT Id, " +
  "Name, " +
  "RRK_NM__c, " +
  "RRK_SEIKYU__c " +
  "FROM RRK__c " +
  "WHERE Id = '" + rrkid + "'";
  force.query(soql, success, error);
}

function showRRKList() {
    console.log("showRRKList:start")
    var static_img = 'dishesM0002'
    sfdcUtil.getStaticResource(static_img,function(data){
        console.log(JSON.stringify(data))
    },
    function(error){
        alert("Error: " + JSON.stringify(error))
    })
    getRRKList(
        function (data) {
            console.log('data:'+data)
            var rrks = data.records,
                html = '';
            for (var i=0; i<rrks.length; i++) {
                html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">名称:' + rrks[i].Name + '</a></li>';
                html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">描述:' + rrks[i].dishes_recode_name__c + '</a></li>';
                // html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">图片:<img src=' + rrks[i].dishes_img__c + '</a></li>';
                html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">图片:<img src=https://zwk-playful-moose-388230-dev-ed.lightning.force.com/resource/dishesM0001' + '</a></li>';
                html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">图片:<img src=/resource/aaaa.jpg' + '</a></li>';
                html += '<li class="table-view-cell"><a href="#rrkid/'+ rrks[i].Id +'">图片:<img src=./resource/aaaa.jpg' + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">「連絡表」最新情報</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
        console.log("showRRKList:end")
    return false;
}

function showRRKDetails(rrkid) {

    getRRKDetails(rrkid,
        function (data) {
            var rrk = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">連絡表詳細</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + rrk.Name + '</h4>' +
                                '<p>' + (rrk.Id || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">連絡票番号: ' +
                                rrk.RRK_NM__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (rrk.RRK_SEIKYU__c || 'No request yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<a href="#kbid/'+ rrk.Id +'"><p>>>to koban:' + '</p></a>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function getKBList(success, error) {
  var soql = "SELECT Id, Name, CNN_RRK__c,KB_LN_SUB_NUM__c,CNN_RRK__c, CNN_RRK__.name FROM KOBAN__c";
  force.query(soql, success, error);
}

function showKBList() {

    getKBList(
        function (data) {
            var kb = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">「子番号」情報</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>名称：' + kb.Name + '</h4>' +
                                '<p>番号：' + (kb.Id || 'No id yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">連絡票番号： ' +
                                kb.CNN_RRK__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (kb.KB_LN_SUB_NUM__c || 'No line yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
  
    return false;
}


var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showRRKList);
router.addRoute('rrkid/:id', showRRKDetails);
router.addRoute('kbid/:id', showKBList);
