(function() {
        angular.module('uploadApp')
            .controller('SearchFileController', ['$scope', 'fileSearch', function($scope, fileSearch){
                
                $scope.searchFile = function() {
                    fileName = $scope.fileName;
                    console.log(fileName);
                    searchUrl = '/file/' + fileName;
                    $scope.searchUrl = searchUrl;
                    fileSearch.searchFileFromUrl(searchUrl).then(function(searchedFile) {
                      $scope.searchedFile = searchedFile;
                    });
                };
        }]);
} ());
