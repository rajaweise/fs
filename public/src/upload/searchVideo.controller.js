(function() {
        angular.module('uploadApp')
            .controller('SearchVideoController', ['$scope', '$sce', function($scope, $sce){
                
                var searchUrl = '';
                
                $scope.searchFile = function() {
                    fileName = $scope.fileName;
                    console.log(fileName);
                    searchUrl = 'http://localhost:3000/file/' + fileName;
                    console.log(searchUrl);
                    $scope.searchUrl =  searchUrl;
                    console.log($scope.searchUrl);
                };
        }]);
} ());
