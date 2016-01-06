define(['controllers/grid/grid-controller'], function (GridController) {
	
	var controller = GridController.pop();
	
	describe("Grid controller", function () {
		var $scope;
		
		it("Should be an array", function () {
			expect(GridController instanceof Array).toBe(true);
		});
	
		beforeEach(function () {
			spyOn($, 'ajax').and.callFake(function (params) {
				params.success([
				    {"id": 1,"name": "name1","surname": "surname1","birthdate": "24-8-1981","mobile":"1231241234","address": "Poznań, Długa 2" },
				    {"id": 2,"name": "name2","surname": "surname2","birthdate": "24-10-1981","mobile":"3223423","address": "Poznań, Długa 3" },
				    {"id": 3,"name": "name3","surname": "surname3","birthdate": "24-9-1981","mobile":"1234432","address": "Poznań, Długa 4" },
				    {"id": 4,"name": "name4","surname": "surname4","birthdate": "24-1-1981","mobile":"7686785","address": "Poznań, Długa 5" },
				    {"id": 5,"name": "name5","surname": "surname5","birthdate": "24-2-1981","mobile":"4563534","address": "Poznań, Długa 6" },
				    {"id": 6,"name": "name6","surname": "surname6","birthdate": "24-3-1981","mobile":"34657645","address": "Poznań, Długa 7" },
				    {"id": 7,"name": "name7","surname": "surname7","birthdate": "24-5-1981","mobile":"234235345","address": "Poznań, Długa 8" }
				]);
			});
			controller($scope = { $apply: function (f) { f(); }});
		});
		
		describe("Grid data loading", function () {
			it("Should request data", function () {
				expect($.ajax).toHaveBeenCalled();
			});
			
			it("Should ask proper url", function () {
				expect($.ajax.calls.mostRecent().args [0].url).toBe('fake/findall.json');
			});
			
			it("Should use GET method", function () {
				expect($.ajax.calls.mostRecent().args [0].method).toBe('get');
			});
			
			it("Should prepare the rows object", function () {
				expect($scope.rows).toContain({ mode: 'view', state: 'idle', data: {"id": 4,"name": "name4","surname": "surname4","birthdate": "24-1-1981","mobile":"7686785","address": "Poznań, Długa 5" } });
			});
		});
		
		describe("Grid edit mode", function () {
			it("Should prepare the edit object", function () {
				$scope.edit($scope.rows [0]);
				expect($scope.rows [0].mode).toBe('edit');
				expect($scope.rows [0].edit).toEqual($scope.rows [0].data);
			});
			
			it("Should be possible to cancel edit mode", function () {
				$scope.edit($scope.rows [0]);
				$scope.cancel($scope.rows [0]);
				expect($scope.rows [0].mode).toBe('view');
			});
			
			it("Data should be intact after canceling the edit mode", function () {
				var data = _.clone($scope.rows [0].data);
				$scope.edit($scope.rows [0]);
				$scope.rows [0].edit.name = 'foo';
				$scope.cancel($scope.rows [0]);
				expect($scope.rows [0].data).toEqual(data);
			});
			
			it("Should save changes", function () {
				$scope.edit($scope.rows [0]);
				$scope.rows [0].edit.name = 'foo';
				$scope.save($scope.rows [0]);
				expect($scope.rows [0].data.name).toEqual('foo');
			});
			
			it("Should send the changes to the server using POST method", function () {
				$scope.edit($scope.rows [0]);
				$scope.rows [0].edit.name = 'foo';
				$scope.save($scope.rows [0]);
				expect($.ajax.calls.mostRecent().args [0].method).toBe('post');
			});
			
			it("Should send the changes to the server using the right url", function () {
				$scope.edit($scope.rows [0]);
				$scope.rows [0].edit.name = 'foo';
				$scope.save($scope.rows [0]);
				expect($.ajax.calls.mostRecent().args [0].url).toBe('http://users/impaqgroup.com/edit/user.' + $scope.rows [0].data.id);
			});
			
			it("Should send the changes to right data the the server", function () {
				$scope.edit($scope.rows [0]);
				$scope.rows [0].edit.name = 'foo';
				$scope.save($scope.rows [0]);
				expect($.ajax.calls.mostRecent().args [0].data).toEqual(JSON.stringify($scope.rows [0].edit));
			});
		});
		
		describe("Multiple rows edition", function () {
			beforeEach(function () {
				spyOn($scope, 'edit');
			});
			
			it("edit method should be called for each marked row", function () {
				$scope.rows [0].marked = true;
				$scope.rows [3].marked = true;
				$scope.rows [6].marked = true;
				$scope.editSelected();
				expect($scope.edit.calls.count()).toBe(3);
			});
		});
		
		describe("Destroying the data", function () {
			it("Row should get removed", function () {
				var data = $scope.rows [1].data;
				$scope.remove($scope.rows [1]);
				expect($scope.rows).not.toContain({ mode: 'view', state: 'idle', data: data });
			});
			
			it("Should request the right url", function () {
				var data = $scope.rows [1].data;
				$scope.remove($scope.rows [1]);
				expect($.ajax.calls.mostRecent().args [0].url).toEqual('http://users/impaqgroup.com/remove/user.' + data.id);
			});
			
			it("The request payload should hold the object for deletion", function () {
				var data = $scope.rows [2].data;
				$scope.remove($scope.rows [2]);
				expect($.ajax.calls.mostRecent().args [0].data).toEqual(JSON.stringify(data));
			});
			
			
		});
	});
	
});
