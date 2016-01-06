define(['controllers/app/main'], function (Main) {
	'use strict';
	
	var controllersModule = angular.module('app.controllers', [])
		.controller('MainController', Main)
		;
	
	return controllersModule;
});
