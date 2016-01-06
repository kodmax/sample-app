define([], function () {
	'use strict';
	
	var GridController = ['$scope', function ($scope) {
		
		$scope.rows = [
		    { mode: 'view', data: { id: 1, name: 'name1', surname: 'surname1', birthdate: '24-8-1981', mobile:'1231241234', address: 'Poznań, Długa 2' } },
		    { mode: 'view', data: { id: 2, name: 'name2', surname: 'surname2', birthdate: '24-10-1981', mobile:'3223423', address: 'Poznań, Długa 3' } },
		    { mode: 'view', data: { id: 3, name: 'name3', surname: 'surname3', birthdate: '24-9-1981', mobile:'1234432', address: 'Poznań, Długa 4' } },
		    { mode: 'view', data: { id: 4, name: 'name4', surname: 'surname4', birthdate: '24-1-1981', mobile:'7686785', address: 'Poznań, Długa 5' } },
		    { mode: 'view', data: { id: 5, name: 'name5', surname: 'surname5', birthdate: '24-2-1981', mobile:'4563534', address: 'Poznań, Długa 6' } },
		    { mode: 'view', data: { id: 6, name: 'name6', surname: 'surname6', birthdate: '24-3-1981', mobile:'34657645', address: 'Poznań, Długa 7' } },
		    { mode: 'view', data: { id: 7, name: 'name7', surname: 'surname7', birthdate: '24-5-1981', mobile:'234235345', address: 'Poznań, Długa 8' } }
	    ];
		
		$scope.edit = function (row) {
			row.edit = _.clone(row.data); 
			row.mode = 'edit';
		};
		
		$scope.cancel = function (row) {
			row.mode = 'view';
		};
		
		$scope.save = function (row) {
			row.state = 'saving';
			
			$.ajax({
				url: 'api/user/' + row.data.id,
				method: 'post',
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(row.edit),
				
				success: function () {
					$scope.$apply(function () {
						row.mode = 'view';
						row.state = 'ok';
					});					
				},
				
				error: function () {
					$scope.$apply(function () {
						row.mode = 'view';
						row.state = 'error';
					});					
				}
			});
		};
	}];
	
	return GridController;
});
