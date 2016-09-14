'use strict';

/**
 * @ngdoc overview
 * @name multiplusApp
 * @description
 * # multiplusApp
 *
 * Main module of the application.
 */
angular
  .module('multiplusApp', [])
    .run(function(){
    angular.element(document).ready(function(){
        angular.element(".navbar-toggle").on("click", function () {
                  console.log('clicou')
				    angular.element(this).toggleClass("active");
			  });
    })
});
//    angular.document.ready(function () {
//			  $(".navbar-toggle").on("click", function () {
//                  console.log('clicou')
//				    $(this).toggleClass("active");
//			  });
//		});
//};
