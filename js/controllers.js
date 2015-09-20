angular.module("app.controllers", [])
	.controller("LoginCtrl", function($state, $rootScope, $scope) {
		var vm = this;
		vm.init = function() {
			$rootScope.authenticated = false;
		}
		vm.login = function() {
			var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
			ref.authWithPassword({
				email: vm.username,
				password: vm.password
			}, function(error, authData) {
				if (error) {
					//console.log("Login Failed!", error);
					var err = error.code;
					if (err == "INVALID_PASSWORD") {
						$scope.$apply(function() {
							$scope.oops = "Incorrect Password";
						})
					} else if (err == "INVALID_USER") {
						$scope.$apply(function() {
							$scope.oops = "Incorrect Username";
						})
					} else if (err == "INVALID_EMAIL") {
						$scope.$apply(function() {
							$scope.oops = "Invalid Email";
						})
					} else if (err == "NETWORK_ERROR") {
						$scope.$apply(function() {
							$scope.oops = "Network Error";
						})
					} else {
						$scope.$apply(function() {
							$scope.oops = "Unknown Error";
						})
					}
				} else {
					$rootScope.authenticated = true;
					$state.go("new")
				}
			});
		}
	})
	.controller("AnnounceCtrl", function($firebaseArray) {
		var vm = this;
		var announceRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/announcements/");
		vm.announcements = $firebaseArray(announceRef);

		vm.saveAnnouncement = function() {
			console.log('Announcing');
			console.log(vm.announcement)
			if (vm.announcement && vm.name) {
				vm.announcements.$add({
					"content": vm.announcement,
					"author": vm.name
				});
			}
			vm.announcement = "";
			vm.name = "";
		}
	})
	.controller("ForgotCtrl", function($firebaseAuth, $scope, $timeout) {
		var vm = this;
		vm.forgot = function() {
			var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
			$scope.authObj = $firebaseAuth(ref);
			$scope.authObj.$resetPassword({
				email: $scope.email
			}).then(function() {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = "Password reset email sent successfully!";
					})
				})
			}).catch(function(error) {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = error.code;
					})
				})
			});
		}
	})
	.controller("ResetCtrl", function($firebaseAuth, $scope, $timeout, $state, $rootScope) {
		var vm = this;
		vm.reset = function() {
			var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
			$scope.authObj = $firebaseAuth(ref);
			$scope.authObj.$changePassword({
				email: vm.email,
				oldPassword: vm.oldpassword,
				newPassword: vm.newpassword
			}).then(function() {
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops.code = "Password reset email sent successfully!";
					})
				})
        $state.go("new");
        $rootScope.authenticated=true;
			}).catch(function(error) {
        console.log(error.message);
				$timeout(function() {
					$scope.$apply(function() {
						$scope.oops = error.message;
					})
				})
			});
		}
	})
