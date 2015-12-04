/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('FileUploadCtrl', ['$rootScope', '$scope', 'Upload', FileUploadCtrl]);

    function FileUploadCtrl ($rootScope, $scope, Upload) {
        $scope.uploadFile = function(file) {
            file.upload = Upload.upload({
                url: '/api/fileUpload',
                file: file,
                data: {
                    userId: $rootScope.user._id,
                    productName: $scope.productName
                    }
            });
        };
    }
}());