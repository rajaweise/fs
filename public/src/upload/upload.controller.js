(function() {
        angular.module('uploadApp')
            .controller('UploadController', ['$scope', 'fileUpload', function($scope, fileUpload){
                
                $scope.uploadFile = function(){
                    var file = $scope.myFile;
                    console.log('file is ' );
                    console.dir(file);
                    var uploadUrl = "/";
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                };
        }]);
} ());
