bookApp.constant('pagexConfig', {
    visiblePageCount: 6,
    firstText: 'First',
    lastText: 'Last',
    prevText: 'Previous',
    nextText: 'Next'
  }).directive("pager", ['pagexConfig', function(pagexConfig) {
    return {
      link: function(scope, element, attrs) {
        var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : pagexConfig.visiblePageCount;
        scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : pagexConfig.firstText;
        scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : pagexConfig.lastText;
        scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : pagexConfig.prevText;
        scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : pagexConfig.nextText;
        scope.currentPage = 1;
        scope.pageChange = function(page) {
          if (page >= 1 && page <= scope.pageCount) {
            scope.currentPage = page;
          } else {
            scope.currentPage = 1;
          }
        }
        function build() {
          var low,
            high,
            v;
          scope.pagenums = [];
          if (scope.pageCount == 0) {
            return;
          }
          if (scope.currentPage > scope.pageCount) {
            scope.currentPage = 1;
          }
          if (scope.pageCount <= visiblePageCount) {
            low = 1;
            high = scope.pageCount;
          } else {
            v = Math.ceil(visiblePageCount / 2);
            low = Math.max(scope.currentPage - v, 1);
            high = Math.min(low + visiblePageCount - 1, scope.pageCount);
            if (scope.pageCount - high < v) {
              low = high - visiblePageCount + 1;
            }
          }
          for (; low <= high; low++) {
            scope.pagenums.push(low);
          }
          scope.onPageChange();
        }
        scope.$watch('currentPage+pageCount', function() {
          build();
        });
      },
      replace: true,
      restrict: "E",
      scope: {
        pageCount: '=',
        currentPage: '=',
        onPageChange: '&'
      },
      template: '<ul class="pagination pagination-sm"><li ng-click="pageChange(1)"><a href="javascript:">{{firstText}}</a></li>' +
        '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)"><a href="javascript:">{{prevText}}</a></li>' +
        '<li ng-repeat="pagenum in pagenums" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}"><a href="javascript:">{{pagenum}}</a></li>' +
        '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)"><a href="javascript:">{{nextText}}</a></li>' +
        '<li ng-click="pageChange(pageCount)"><a href="javascript:">{{lastText}}</a></li></ul>'
    }
  }]);

bookApp.directive("addDetail",function(){
  return{
    restrict:"A",
    scope:{
      details:'=',
      ptypes:'='
    },
    templateUrl:"templates/shop/addDetail.html",
    link:function(scope, element, attrs){
      scope.temOptions =[];
      scope.defaultImg = "http://192.168.168.222:8080/crm-web-in/productModels/def.png";
      scope.temImg = scope.defaultImg;
      scope.temDetail = {};
      scope.addLine=function(){
       scope.details.push({type:'',productName:'',pmodel:'',productId:'',num:'',sprice:'',tprice:'',option:null,img:''});
      };
      scope.remove=function(_obj){
        for(var i=0; i<(scope.details.length); i++){
          if(scope.details[i]===_obj){
            scope.details.splice(i,1);
          }
        };
      };
      scope.setOptions = function(_obj){
          //console.log(_obj);
          scope.temDetail = _obj;
          var flag = false;
          if(_obj.option){
              flag = _obj.productId==_obj.option[0].productId?false:true;
          }
          if(!_obj.option||flag){
              var id = _obj.productId;
              if(id!=""){
                $.ajax({
                    type: "POST",
                    url: "/bookApp/data/specList.php",
                    data: {"id": id},
                    dataType: "json",
                    success: function (dateResult, textStatus) {
                      scope.$apply(function(){
                        scope.temOptions = dateResult;
                        scope.temImg = _obj.img;
                      });
                      $("#specModal").modal("show");
                    }
                  });
              }else{
                scope.temOptions =[{"productId":"","specKey":"要求","specValue":""}];
                scope.temImg = scope.defaultImg;
                $("#specModal").modal("show");
              }
          }else{
              scope.temOptions = _obj.option;
              if(_obj.img!=""){
              scope.temImg = _obj.img;
              }else{
              scope.temImg = scope.defaultImg;

              }
              $("#specModal").modal("show");
          }
      };
      scope.saveSpec = function(){
          
          scope.temDetail.option = [];
            $.extend(scope.temDetail.option,scope.temOptions);
      }
    }
  }
}); 
bookApp.directive("typeAhead",function(){
  return{
    restrict:"AE",
    scope:{
      detail:'='
    },
    template:"<input name='author' ng-model='detail.productName' type='text' class='form-control'/>",
    link:function(scope, element, attrs){
        //产品名称输入提示
        scope.product_list = [];
        var timeout = setTimeout(function(){
            $(element).find("input").eq(0).typeahead({
              items:60,
              source:function (query, process) {
                $.ajax({
                  type: "POST",
                  url: "/bookApp/data/productList.php",
                  data: {"productName": query},
                  dataType: "json",
                  success: function (dateResult, textStatus) {
                    scope.product_list = dateResult;
                    var dataList = [];
                    $.each(dateResult, function (i, obj) {
                      dataList.push(obj.productName);
                    });
                    process(dataList);
                  }
                });
              },
              updater: function (name) {
                for(var i=0; i<scope.product_list.length;i++){
                  if(name==scope.product_list[i].productName){
                    scope.$apply(function(){
                      scope.detail.pmodel = scope.product_list[i].productCode;
                      scope.detail.productName= name; 
                      scope.detail.productId = scope.product_list[i].id;
                      scope.detail.img= scope.product_list[i].filePath; 
                    });
                    
                    return name;
                  }
                }
              }
            });
            clearTimeout(timeout);
          },100);
    }
  }
});