'use strict';

/**
 * @ngdoc function
 * @name multiplusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplusApp
 */
angular.module('multiplusApp')
  .controller('MainCtrl', function ($scope) {
    $scope.form = {};
    $scope.form.nome = '';
    $scope.form.email = '';
    $scope.form.msg = '';
    $scope.warning = false;
    
    $scope.submit = function(){
        
        $scope.warning = validForm();
        if(!$scope.warning){
//            send message
            console.log($scope.form, 'time to send message');
        }
    }
    
    $scope.focus = function(){
        $scope.warning = false;
    }
    
    function validForm(){
        if($scope.form.nome.length === 0 || !$scope.form.nome.trim()){
            return '*preencha o campo nome.'
        }
        
        if($scope.form.email.length === 0 || !/\S+@\S+\.\S+/.test($scope.form.email)){
            return '*digite um email válido.'
        }
        
        return false;
    }
  });
