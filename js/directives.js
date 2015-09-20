angular.module("app.directives", [])
	.directive("headerBar", function() {
		return {
			template: ""
		}
	})
.directive("container", function(){
  return {
    template: '<div class="eight columns offset-by-two mycontainer" ng-transclude> </div>',
    transclude:true
  }
})
