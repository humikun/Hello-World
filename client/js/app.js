function getRRKList(success, error) {
  var soql = "select Id, Name, dishes_recode_name__c, dishes_des_recode_name__c, dishes_img__c FROM BM_menu__c";
  force.query(soql, success, error);
}

function showMenu() {
    console.log("showMenu:start")
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
            var dishes = data.records,
                html_Content = '',
                Menu_Content = '';
            for (var i=0; i<dishes.length; i++) {
                Menu_Content += '<li class="table-view-cell"><a href="#dishId/'+ dishes[i].Id +'">名称:' + dishes[i].Name + '</a></li>';
                // Menu_Content += '<li class="table-view-cell"><a href="#dishId/'+ dishes[i].Id +'">描述:' + dishes[i].dishes_recode_name__c + '</a></li>';
                Menu_Content += '<li class="table-view-cell"><a href="#dishId/'+ dishes[i].Id +'">' + StringUtil.getImgFromSfdc(dishes[i].dishes_img__c) + '</a></li>';
            }
            html_Content =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">【Brother Menu】最新菜单</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + Menu_Content + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html_Content));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
        console.log("showMenu:end")
    return false;
}

function getRRKDetails(dishId, success, error) {
    var soql = "SELECT " + 
    "Id, " +
    "Name, " +
    "Price__c, " +
    "dishes_des_recode_name__c, " +
    "dishes_img__c " +
    "FROM BM_menu__c " +
    "WHERE Id = '" + dishId + "'";
    force.query(soql, success, error);
}

function showMenuDetails(dishId) {

    getRRKDetails(dishId,
        function (data) {
            var dishes = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href=""><span class="icon icon-left-nav"></span>Back</a>' +
                '<h1 class="title">【Brother Menu】菜单詳細</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + dishes.Name + '</h4>' +
                                '<p>' + (dishes.Price__c || 'Not priced yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">特点: ' +
                                dishes.dishes_des_recode_name__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (StringUtil.getImgFromSfdc(dishes.dishes_img__c) || 'get No image') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<a href="#kbid/'+ dishes.Id +'"><p>>>to koban:' + '</p></a>' +
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
router.addRoute('', showMenu);
router.addRoute('dishId/:id', showMenuDetails);
router.addRoute('kbid/:id', showKBList);
