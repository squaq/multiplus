'use strict';

/**
 * @ngdoc function
 * @name multiplusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplusApp
 */
angular.module('multiplusApp')
  .controller('MainCtrl', function ($scope, $location, anchorSmoothScroll, $window, $uibModal, $http, $cookies) {
    $scope.form = {};
    $scope.form.nome = '';
    $scope.form.email = '';
    $scope.form.msg = '';
    $scope.warning = false;
    $scope.sentEmail = false;
    
    $scope.vantagens = {};
    
    
    $scope.vantagens.txt = "Depois que conheci a Múltiplos, percebi que tinha perdido muito tempo na minha vida financeira. Esse encontro deveria ter acontecido há dez anos.";
    $scope.vantagens.thumb = "images/avatarEx.jpg";
    $scope.vantagens.altor = "Angelinne Gomes";
    $scope.vantagens.prof = "Profissional Liberal";
    
    $scope.vantagens.vdId1 = "6jU1Hg6-7xI";
    $scope.vantagens.vdId2 = "MQJzE8qM8Fs";
    $scope.vantagens.vdId3 = "nRYeswbOoRw";
    $scope.popupAlreadyCalled = false;   
    
//    $uibModal.open({
//            animation: true,
//            templateUrl: 'views/modal.html',
//            controller: 'ModalCtrl'
////        ,
////            size: 'lg',
////            resolve: {
////                moldes: function () {
////                  return $rootScope.moldes;
////                }
////            }
//    }).result.then(function (selectedItem) {
//        console.log('selectedItem', selectedItem);
//    }, function () {
//      console.log('Modal dismissed at: ' + new Date());
//    });
    
    $scope.popup = function(){
        
//        console.log('multiplosPopUp', $cookies.get('multiplosPopUp'));
//        if(!$cookies.get('multiplosPopUp')&& !$scope.popupAlreadyCalled){
//            $uibModal.open({
//                    animation: true,
//                    templateUrl: 'views/modal.html',
//                    controller: 'ModalCtrl'
//            }).result.then(function (selectedItem) {
//                console.log('selectedItem', selectedItem);
//            }, function () {
//              console.log('Modal dismissed at: ' + new Date());
//                $scope.popupAlreadyCalled = true;
//            });        
//        }
    }
    
    if($location.search().emailSent){
        $scope.popup();
        $cookies.put('multiplosPopUp')
    }
    
    $scope.submit = function(){
        
        $scope.warning = validForm();
        if(!$scope.warning){
//            send message
            
//            var url = "mail.php?email="+$scope.form.email+"&nome="+$scope.form.nome+"&msg="+$scope.form.msg;
            $http.post("send.php", {"email":$scope.form.email, "nome":$scope.form.nome, "msg":$scope.form.msg }).then(function(data) {
                if (data.errors) {
                  // Showing errors.
                    console.log('errors', data.errors);

                } else {
                  $scope.message = data.message;
                    $scope.sentEmail = true;
                    console.log('success', data);
                }
            }, function(error){console.log('error', error);});
//            console.log($scope.form, 'time to send message');
        }
    };
    
    $scope.novoOrcamento = function(){
        $scope.warning = $scope.sentEmail = false;
        $scope.form.nome = '';
        $scope.form.email = '';
        $scope.form.msg = '';
    };
    
    $scope.focus = function(){
        $scope.warning = false;
        $scope.warningNome = false;
        $scope.warningEmail = false;
    };
    
    function validForm(){
        angular.element('#formNome').removeClass('has-error');
        angular.element('#formEmail').removeClass('has-error');
        if($scope.form.nome.length === 0 || !$scope.form.nome.trim()){
            angular.element('#formNome').addClass('has-error');
            $scope.warningNome = true;
            return '*preencha o campo nome.';
        }
        
        if($scope.form.email.length === 0 || !/\S+@\S+\.\S+/.test($scope.form.email)){
            angular.element('#formEmail').addClass('has-error');
            $scope.warningEmail = true;
            return '*digite um email válido.';
        }
        return false;
    }
    
    $scope.settingVantagensVds = function(){
//        angular.element("#vd_f").css("background-image", "url(http://img.youtube.com/vi/"+$scope.vantagens.vdId1+"/0.jpg)");
//        angular.element(".vd2").css("background-image", "url(http://img.youtube.com/vi/"+$scope.vantagens.vdId2+"/0.jpg)");
//        angular.element(".vd3").css("background-image", "url(http://img.youtube.com/vi/"+$scope.vantagens.vdId3+"/0.jpg)");
        angular.element("#vd_f iframe").attr('src', 'https://www.youtube.com/embed/'+$scope.vantagens.vdId1);
        angular.element(".vd2 iframe").attr('src', 'https://www.youtube.com/embed/'+$scope.vantagens.vdId2);
        angular.element(".vd3 iframe").attr('src', 'https://www.youtube.com/embed/'+$scope.vantagens.vdId3);
//        'https://www.youtube.com/embed/'
    };
    
    $scope.callVd = function(vdId){
//        console.log("call vd",vdId);
        $scope.openUrl("https://www.youtube.com/watch?v="+vdId+"&autoplay=1");
    };
    
    $scope.openUrl = function(url){
        $window.open(url, '_blank');
        
    };
    
    $scope.go = function(p){
        $location.path(p);
    };
    
    $scope.$watch(function () {
        return location.hash;
    }, function (value) {
        
        anchorSmoothScroll.scrollTo(value.substr(2));
        if (angular.element(".navbar-collapse").hasClass("in")) {
            angular.element('[data-toggle="collapse"]').click();
        }
//       $anchorScroll(value.substr(2));
    });
  });
