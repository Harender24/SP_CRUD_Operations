'use strict';

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Utilities = BasicJSRest.Utilities || {};

BasicJSRest.Utilities.LogResult = function (msg) {
  msg = GetUniqueNumber() + '- ' + msg;
  $('.resultsDisplaySingle p').removeClass('highlighted');
  $('.resultsDisplay p').removeClass('highlighted');
  $('#results').append("<p class='highlighted'>" + msg + '</p>');
  $('#results').append('<hr>');
};

BasicJSRest.Utilities.Fail = function (err) {
  BasicJSRest.Utilities.LogResult(
    'Error occurred on server - in Failure callback'
  );

  BasicJSRest.Utilities.LogResult(err);
};
