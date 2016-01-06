define(['controllers/grid/grid-controller'], function (GridController) {
	
	var controller = GridController.pop();
	
	describe("Grid controller", function () {
		var $scope;
		
		beforeEach(function () {
			spyOn($, 'ajax');
			controller($scope = {});
		});
		
		it("Should be an array", function () {
			expect(GridController instanceof Array).toBe(true);
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
		});
		
	});
	
});
