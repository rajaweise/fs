(function() {
    angular.module('uploadApp')
        .service('fileSearch', ['$http', '$q', function ($http, $q) {
            var searchedFile = '';
                   
            searchFileFromUrl = function(searchUrl){
                var deferred = $q.defer();
                  $http({
                        method: 'GET',
                        url: searchUrl,
                        responseType: 'arraybuffer'
                      }).success(function(response) {
                        console.log(response);
                        searchedFile = _arrayBufferToBase64(response);
                        deferred.resolve(searchedFile);
                      }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;

                    
                    //buffer must be in Base64 to use as an asynchronous attribute of anchor elements (allows vids to be cached and asynchronous loading of page data)
                    
                      function _arrayBufferToBase64(buffer) {
                        var binary = '';
                        var bytes = new Uint8Array(buffer);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                          binary += String.fromCharCode(bytes[i]);
                        }
                        return window.btoa(binary);
                      }
            };
            
            return {
                searchedFile: searchedFile,
                searchFileFromUrl: searchFileFromUrl
            };
        }]);
})();