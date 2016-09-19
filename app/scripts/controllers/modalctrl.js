'use strict';

angular.module('multiplusApp').controller('ModalCtrl', function ($scope, $uibModalInstance, $http) {
    $scope.form = {};
    
    $scope.form.id = "64358";
    $scope.form.pid = "1401788";
    $scope.form.list_id = "64358";
    $scope.form.id = "leadlovers";
    
    $scope.form.nome = '';
    $scope.form.email = '';
    $scope.warning = false;
    $scope.warningNome = false;
    $scope.warningEmail = false;
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    
   $scope.submit = function(){
       $scope.warning = validForm();
        if(!$scope.warning){
            
            $http.post('https://leadlovers.com/Pages/Index/64358', $scope.form, {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                } 
            }).then(function(data) {
                if (data.errors) {
                  // Showing errors.
                    console.log('errors', data.errors);

                } else {
                  $scope.message = data.message;
                    console.log('success', data.message);
                }
            }, function(error){console.log('error', error);});
//            send message
//            console.log($scope.form, 'time to send message');
        }
//       "https://leadlovers.com/Pages/Index/64358"
   };
   
   $scope.focus = function(){
        $scope.warning = false;
        $scope.warningNome = false;
        $scope.warningEmail = false;
    };
   
   function validForm(){
        angular.element('.formNome').removeClass('has-error');
        angular.element('.formEmail').removeClass('has-error');
        if($scope.form.nome.length === 0 || !$scope.form.nome.trim()){
            angular.element('.formNome').addClass('has-error');
            $scope.warningNome = true;
            return '*preencha o campo nome.';
        }
        
        if($scope.form.email.length === 0 || !/\S+@\S+\.\S+/.test($scope.form.email)){
            angular.element('.formEmail').addClass('has-error');
            $scope.warningEmail = true;
            return '*digite um email válido.';
        }
        $scope.sentEmail = true;
        return false;
    }
});