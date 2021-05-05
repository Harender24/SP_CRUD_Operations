'use strict';

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Batching = BasicJSRest.Batching || {};
BasicJSRest.Utilities = BasicJSRest.Utilities || {};

BasicJSRest.Utilities.ListManager = function () {
  //#region private variables

  //#endregion private variables

  //#region private functions

  // Read function
  function _getAll() {
    var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, '_api/web/lists');

    var dfd = $.ajax({
      url: baseUrl,
      type: 'GET',
      contentType: 'application/json;odata=verbose',
      headers: {
        accept: 'application/json;odata=verbose',
      },
    });
    return dfd.promise();
  }

  // GetListFields function

  function _getListFields() {
    var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
      _spPageContextInfo.webServerRelativeUrl,
      '_api/web/lists/?$expand=fields/title'
    );

    var dfd = $.ajax({
      url: baseUrl,
      type: 'GET',
      contentType: 'application/json;odata=verbose',
      headers: {
        accept: 'application/json;odata=verbose',
      },
    });
    return dfd.promise();
  }

  //#endregion private function

  //#region Public Members
  var publics = {
    getAllLists: _getAll,
    getListFields: _getListFields,
  };
  return publics;
  //#endregion Public Members
};
