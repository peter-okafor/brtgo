angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            //$state.go('tab.dash');
            $state.go('welcome');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
	var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });
})

.controller('SliderCtrl', function($scope, $state) {
    $scope.data = {};
	
	$scope.options = {
  loop: false,
  effect: 'fade',
  speed: 500,
}
    $scope.skip = function() {
        $state.go('login');
    }
})

.controller('WelcomeCtrl', function($scope, $state) {
    $scope.data = {};
	
    $scope.plantrip = function() {
        $state.go('map');
    }
	$scope.nearbyroutes = function() {
        $state.go('map');
    }
	$scope.mticket = function() {
        $state.go('map');
    }
	$scope.favourites = function() {
        $state.go('map');
    }
	$scope.settings = function() {
        $state.go('map');
    }
	
});