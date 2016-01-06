define([], function () {
	'use strict';
	
	var GridController = ['$scope', function ($scope) {

		$scope.rows = [];
		$.ajax({
			url: 'fake/findall.json',
			method: 'get',
			dataType: 'json',
			success: function (data) {
				$scope.$apply(function () {
					$scope.rows = [];
					
					_.each(data, function (rowdata) {
						$scope.rows.push({ mode: 'view', state: 'idle', data: rowdata });
					});
				});
			}
		});
		

		/*
		$scope.rows = [
		    { mode: 'view', state: 'idle', data: { id: 1, name: 'name1', surname: 'surname1', birthdate: '24-8-1981', mobile:'1231241234', address: 'Poznań, Długa 2' } },
		    { mode: 'view', state: 'idle', data: { id: 2, name: 'name2', surname: 'surname2', birthdate: '24-10-1981', mobile:'3223423', address: 'Poznań, Długa 3' } },
		    { mode: 'view', state: 'idle', data: { id: 3, name: 'name3', surname: 'surname3', birthdate: '24-9-1981', mobile:'1234432', address: 'Poznań, Długa 4' } },
		    { mode: 'view', state: 'idle', data: { id: 4, name: 'name4', surname: 'surname4', birthdate: '24-1-1981', mobile:'7686785', address: 'Poznań, Długa 5' } },
		    { mode: 'view', state: 'idle', data: { id: 5, name: 'name5', surname: 'surname5', birthdate: '24-2-1981', mobile:'4563534', address: 'Poznań, Długa 6' } },
		    { mode: 'view', state: 'idle', data: { id: 6, name: 'name6', surname: 'surname6', birthdate: '24-3-1981', mobile:'34657645', address: 'Poznań, Długa 7' } },
		    { mode: 'view', state: 'idle', data: { id: 7, name: 'name7', surname: 'surname7', birthdate: '24-5-1981', mobile:'234235345', address: 'Poznań, Długa 8' } }
	    ];
	    */
		
		$scope.edit = function (row) {
			row.edit = _.clone(row.data); 
			row.mode = 'edit';
		};
		
		$scope.cancel = function (row) {
			row.mode = 'view';
		};
		
		$scope.editSelected = function () {
			_.each($scope.rows, function (row) {
				if (row.marked) {
					$scope.edit(row);
					row.marked = false;
				}
			});
		};
		
		$scope.save = function (row) {
			row.state = 'saving';
			
			$.ajax({
				url: 'http://users/impaqgroup.com/edit/user.' + row.data.id,
				method: 'post',
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(row.edit),
				
				success: function () {
					$scope.$apply(function () {
						row.mode = 'view';
						row.state = 'idle';
					});					
				},
				
				error: function () {
					$scope.$apply(function () {
						row.mode = 'view';
						row.state = 'idle';
					});					
				}
			});
		};
		
		$scope.remove = function (row) {
			row.state = 'deleting';
			
			$.ajax({
				url: 'http://users/impaqgroup.com/remove/user.' + row.data.id,
				method: 'post',
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(row.edit),
				
				success: function () {
					$scope.$apply(function () {
						$scope.rows.splice($scope.rows.indexOf(row), 1);
					});					
				},
				
				error: function () {
					$scope.$apply(function () {
						$scope.rows.splice($scope.rows.indexOf(row), 1);
					});					
				}
			});
		};
	}];
	
	return GridController;
});
