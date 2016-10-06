'use strict';

angular.module('multiplusApp').controller('ModalCtrl', function ($scope, $uibModalInstance, $http, $cookies, $location) {
    $scope.form = {};
    
    $scope.form.id = "64358";
    $scope.form.pid = "1401788";
    $scope.form.list_id = "64358";
    $scope.form.id = "leadlovers";
    
    $scope.form.nome = '';
    $scope.form.email = '';
    $scope.warningPop = false;
    $scope.warningNomePop = false;
    $scope.warningEmailPop = false;
    
    
    
    if($location.search().emailSent){
        $scope.sentEmailPop = $location.search().emailSent;
    }
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    
   $scope.sendForm = function(){
       $scope.warningPop = validForm();
        if(!$scope.warningPop){
            $http({
                method:'POST',
                url:'https://leadlovers.com/Pages/Index/64358', 
                data:$httpParamSerializer($scope.form), 
                headers : {'Content-Type' : 'application/x-www-form-urlencoded;'} 
            
        }).then(function(data) {
                if (data.errors) {
                  // Showing errors.
                    console.log('errors', data.errors);
                } else {
                  $scope.message = data.message;
                    console.log('success', data.message);
                    
                    $cookies.put('multiplosPopUp', true);
                    $scope.sentEmailPop = true;
                }
            }, function(error){console.log('error', error);});
//            send message
//            console.log($scope.form, 'time to send message');
        }
//       "https://leadlovers.com/Pages/Index/64358"
   };
   
   $scope.focus = function(){
        $scope.warningPop = false;
        $scope.warningNomePop = false;
        $scope.warningEmailPop = false;
    };
   
   function validForm(){
        angular.element('#formNomePop').removeClass('has-error');
        angular.element('#formEmailPop').removeClass('has-error');
        if($scope.form.nome.length === 0 || !$scope.form.nome.trim()){
            angular.element('#formNomePop').addClass('has-error');
            $scope.warningNomePop = true;
            return '*preencha o campo nome.';
        }
        
        if($scope.form.email.length === 0 || !/\S+@\S+\.\S+/.test($scope.form.email)){
            angular.element('#formEmailPop').addClass('has-error');
            $scope.warningEmailPop = true;
            return '*digite um email válido.';
        }        
        return false;
    }
});