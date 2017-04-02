angular.module('home')
  .directive('autoresize', autoresize);

function autoresize() {
  var directive = {
    link: link
  };

  return directive;

  function link(scope, elem, attrs) {

    var adjustHeight = function() {
      var scrollHeight = elem[0].scrollHeight;
      elem.css('height', scrollHeight + "px");
    };

    // Adjust height whenever `textarea` is inputted or focused.
    elem.bind('input focus', adjustHeight);

    // Adjust height as soon as app is loaded.
    scope.$watch(['$viewContentLoaded'], adjustHeight);
  }
}
