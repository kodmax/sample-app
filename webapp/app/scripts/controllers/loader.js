define(['controllers/app/main-controller', 'controllers/grid/grid-controller'], function (MainController, GridController) {
	'use strict';
	
	var controllersModule = angular.module('app.controllers', [])
		.controller('MainController', MainController)
		.controller('GridController', GridController)
		;
	
	return controllersModule;
});
