'use strict';

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Utilities = BasicJSRest.Utilities || {};

BasicJSRest.Utilities.ListItemManager = function () {
  //#region Private Variables
  var pageNum = 0;
  var pageSize = 100;
  //#endregion Private Variables

  //#region Private Functions

  // Get All List Items
  function _getListItems(listName) {
    var dfd = $.Deferred();

    var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
      _spPageContextInfo.webServerRelativeUrl,
      '_api/web/lists/'
    );
    baseUrl += "GetByTitle('" + listName + "')/items";
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

  // List Item paging
  function _getListItemsPaged(listName) {
    var dfd = $.Deferred();

    var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
      _spPageContextInfo.webServerRelativeUrl,
      '_api/web/lists/'
    );
    baseUrl += "GetByTitle('" + listName + "')/items/?$top=" + pageSize;
    //need to add skiptoken unencoded or else the % in %26 and %3d gets encoded to %25 which breaks things
    baseUrl =
      encodeURI(baseUrl) +
      '&$skiptoken=Paged%3dTRUE%26p_ID%3d' +
      pageNum * pageSize;
    ++pageNum;
    var dfd = $.ajax({
      url: baseUrl /*encodeURI(baseUrl),*/,
      type: 'GET',
      contentType: 'application/json;odata=verbose',
      headers: {
        accept: 'application/json;odata=verbose',
      },
    });
    return dfd.promise();
  }

  //   Filter Lookup (Expand)
  function _getChildren(parentName) {
    var dfd = $.Deferred();
    var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
      _spPageContextInfo.webServerRelativeUrl,
      '_api/web/lists/'
    );
    baseUrl += "GetByTitle('ChildList')";
    baseUrl +=
      "/items?$select=Title,SampleData/Title&$expand=SampleData/Title&$filter=(SampleData/Title eq '";
    baseUrl += parentName + "')";
    var headers = {
      accept: 'application/json;odata=verbose',
    };
    var dfd = $.ajax({
      url: encodeURI(baseUrl),
      type: 'GET',
      contentType: 'application/json;odata=verbose',
      headers: headers,
    });
    return dfd.promise();
  }
  //#endregion Private Functions

  //#region Public Members

  var publics = {
    getListItems: _getListItems,
    getListItemsPaged: _getListItemsPaged,
    getChildren: _getChildren,
  };
  return publics;
  //#endregion Public Members
};
