require.config({
	baseUrl: 'scripts/',
	
	paths: {
		
	}
});

require(['controllers/loader'], function () {
	var app = angular.module('app', ['app.controllers']);
	
	$(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});
});