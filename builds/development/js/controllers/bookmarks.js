app.controller('BookmarksController',
  function($scope, $firebase, $rootScope, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/bookmarks');
  
  var bookmarksInfo = $firebase(ref);
  var bookmarksObj = bookmarksInfo.$asObject();
  var bookmarksArray = bookmarksInfo.$asArray();

  bookmarksObj.$loaded().then(function(data){
    $scope.bookmarks = data;
  }); //make sure bookmarks data is loaded

  bookmarksArray.$loaded().then(function(data){
    $rootScope.howManyBookmarks = bookmarksArray.length;
  }); //counts the bookmarks of a user

  bookmarksArray.$watch(function(data){
    $rootScope.howManyBookmarks = bookmarksArray.length;
  }); //instant refresh 

  $scope.addBookmark = function() {
    bookmarksInfo.$push({
      name: $scope.bookmarkName,
      url : $scope.bookmarkUrl,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.bookmarkName=''
      $scope.bookmarkUrl='';
    });
  }; //addBookmark

  $scope.deleteBookmark = function(key) {
  	bookmarksInfo.$remove(key)
  }; //deleteBookmark


  }); //BookmarksController