angular.module("app.controllers", [])
	.controller("LoginCtrl", function($state, $rootScope, $scope, $firebaseAuth) {
		var vm = this;
		vm.init = function() {
			$rootScope.authenticated = false;
		};
		vm.login = function() {
			var auth = $firebaseAuth();
			auth.$signInWithEmailAndPassword(vm.username, vm.password).then(function(error, authData) {
				if (!error) {
					$rootScope.authenticated = true;
					$state.go("new");
				}
			});
		};
	})
	.controller("AnnounceCtrl", function($firebaseArray) {
		var vm = this;
		var announceRef = firebase.database().ref("announcements");
		vm.announcements = $firebaseArray(announceRef);

		vm.saveAnnouncement = function() {
			if (vm.announcement && vm.name) {
				vm.announcements.$add({
					"content": vm.announcement,
					"author": vm.name
				});
			}
			vm.announcement = "";
			vm.name = "";
		};
	})
	.controller("ForgotCtrl", function($firebaseAuth, $scope, $timeout) {
		var vm = this;
		vm.forgot = function() {
			var ref = firebase.database().ref();
			$scope.authObj = $firebaseAuth(ref);
			$scope.authObj.$resetPassword({
				email: $scope.email
			}).then(function() {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = "Password reset email sent successfully!";
					});
				});
			}).catch(function(error) {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = error.message;
					});
				});
			});
		};
	})
	.controller("ResetCtrl", function($firebaseAuth, $scope, $timeout, $state, $rootScope) {
		var vm = this;
		vm.reset = function() {
			var ref = firebase.database().ref();
			$scope.authObj = $firebaseAuth(ref);
			$scope.authObj.$changePassword({
				email: vm.email,
				oldPassword: vm.oldpassword,
				newPassword: vm.newpassword
			}).then(function() {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops.code = "Password reset email sent successfully!";
					});
				});
				$state.go("new");
				$rootScope.authenticated = true;
			}).catch(function(error) {
				console.log(error.message);
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = error.message;
					});
				});
			});
		};
	});
