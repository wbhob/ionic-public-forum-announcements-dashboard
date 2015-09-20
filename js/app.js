angular.module("app", ["firebase", "app.controllers", "ui.router", "app.directives"])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state("login", {
    url:"/",
    templateUrl: "templates/login.html",
    controller:"LoginCtrl as login"
  })
  .state("new", {
    url:"/compose",
    templateUrl: "templates/newannouncement.html",
    controller:"AnnounceCtrl as announcement"
  }).state("forgot", {
    url:"/forgot",
    templateUrl: "templates/forgot.html",
    controller:"ForgotCtrl as forgot"
  }).state("reset", {
    url:"/reset",
    templateUrl: "templates/reset.html",
    controller:"ResetCtrl as reset"
  });
  $urlRouterProvider.otherwise("/");
})
