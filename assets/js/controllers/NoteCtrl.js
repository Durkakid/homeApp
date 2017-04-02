angular.module('home')
  .controller('NoteCtrl', NoteCtrl);

NoteCtrl.$inject = ['$scope'];

function NoteCtrl($scope) {
  var self = this;

  // ** Initialize LocalStorage**
  function initializeLS() {

    // Set scope's localStorage reference window.localStorage - ng-repeat in the HTML uses localStorage to display the Sticky Notes
    self.localStorage = window.localStorage;

    // Delete anything from localStorage that is not related to the StickyNotes app. This is because localStorage is used by ng-repeat to display the notes, and would throw an error if we had anything else otherwise.
    for (var prop in window.localStorage) {
      if (String(Number(prop)) === 'NaN') {
        delete window.localStorage[prop];
      }
    }

    // Set the ID of the next Sticky Note to be added.
    self.currentId = Math.max.apply(null, Object.keys(window.localStorage).map(function(val) {
      return parseInt(val);
    })) + 1;

    // If there are no Sticky Notes currently, set the currentID to be 0.
    self.currentId = (self.currentId === -Infinity) ? 0 : self.currentId;
  }

  initializeLS();

  // ** CRUD Methods for Sticky Notes **

  // Add Sticky Note by attaching the premade-string to localStorage with a unique ID.
  self.addSticky = function() {
    window.localStorage[self.currentId++] = initialStrings[self.currentId % initialStrings.length];
  };

  // Update LocalStorage if a user changes a sticky note (using ng-change, so that all changes are immediately bound to LS).
  self.updateLS = function(str, elemID) {
    window.localStorage[elemID] = str;
  };

  // Delete note in LocalStorage if a user clicks on the delete button.
  self.deleteSticky = function(elemID, elem) {
    delete window.localStorage[elemID];
  };

  // Delete all notes on the page by emptying out localStorage.
  self.deleteAll = function() {
    for (var prop in window.localStorage) {
      delete window.localStorage[prop];
    }
  };

  // Initial strings to populate the Sticky Notes.
  var initialStrings = ["Responsive mobile design, based on text content and screen width! No external CSS, except for Normalize.css!",
    "Try editing me & refreshing - the text will persist! Instant data binding to localStorage achieved through custom directives!",
    "No need to click outside the text box - it saves automatically to localStorage!"
  ];
}
