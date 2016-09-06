var app = angular.module('fileUpload', ['ngFileUpload','ngImgCrop']);

app.controller('UploadCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl) {
        console.log("sssssssssss");
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };
    $scope.loadBegin=function(){
        console.log("adsfasdfasdfsadfsadf");
    }

}]);