require.config({
	baseUrl: 'scripts/',
	
	paths: {
		
	}
});

require(['controllers/loader'], function () {
	var app = angular.module('app', ['app.controllers']);
	
	app.run(function () {
		$('.app').show();
	});
	
	$(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});
});