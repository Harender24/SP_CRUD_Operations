'use strict';

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Crud = BasicJSRest.Crud || {};

$(document).ready(function () {
  BasicJSRest.Crud.SimpleDemo = new BasicJSRest.Crud.Simple();
  BasicJSRest.Crud.Init();
});

BasicJSRest.Crud.Init = function () {
  $('#crudButton1').click(BasicJSRest.Crud.SimpleDemo.readLists);
  $('#crudButton2').click(BasicJSRest.Crud.SimpleDemo.readListItems);
  $('#crudButton2a').click(BasicJSRest.Crud.SimpleDemo.readListItemsPaged);
  $('#crudButton11').click(BasicJSRest.Crud.SimpleDemo.filterChildren);
  $('#crudButton10').click(BasicJSRest.Crud.SimpleDemo.getListFields);
};

BasicJSRest.Crud.Simple = function () {
  //#region Private Variables

  var _lim = new BasicJSRest.Utilities.ListItemManager();
  var _lm = new BasicJSRest.Utilities.ListManager();
  var listName;
  //#endregion Private Variables

  //#region Private Function

  // Read Lists
  function _readLists() {
    var dfd = $.Deferred();
    var msg = ' Getting all existing Lists';
    BasicJSRest.Utilities.LogResult(msg);
    var readPromise = _lm.getAllLists();
    readPromise.then(
      function (data, status, jqXHR) {
        _getListSuccess(data);
        dfd.resolve();
      },
      function () {}
    );
    return dfd.promise();
  }
  function _getListSuccess(data) {
    var msg = ' Lists on this site are:<ul>';
    if (data.d.results.length > 0) {
      $.each(data.d.results, function (index, value) {
        msg += '<li>' + value.Title + '</li>';
      });
    } else {
      msg += '<li>' + data.d.Title + '</li>';
    }
    msg += '</ul>';
    BasicJSRest.Utilities.LogResult(msg);
  }

  // Read List Items
  function _readListItems(passedListName) {
    var dfd = $.Deferred();

    if (passedListName.length > 0) {
      listName = passedListName;
    } else {
      listName = 'SampleData';
    }
    var msg = ' Getting all existing List Items in ' + listName;
    BasicJSRest.Utilities.LogResult(msg);
    var promise = _lim.getListItems(listName);
    promise.then(
      function (data, status, jqXHR) {
        _getListItemsSuccess(data);
        dfd.resolve();
      },
      function (jqXHR, status, error) {
        BasicJSRest.Utilities.Fail(error);
        dfd.reject();
      }
    );
    return dfd.promise();
  }

  // Read List Items Paged
  function _readListItemsPaged(passedListName) {
    var dfd = $.Deferred();

    if (passedListName.length > 0) {
      listName = passedListName;
    } else {
      listName = 'SampleData';
    }
    var msg = ' Getting existing List Items in ' + listName;
    BasicJSRest.Utilities.LogResult(msg);
    var promise = _lim.getListItemsPaged(listName);
    promise.then(
      function (data, status, jqXHR) {
        _getListItemsSuccess(data);
        dfd.resolve();
      },
      function (jqXHR, status, error) {
        BasicJSRest.Utilities.Fail(error);
        dfd.reject();
      }
    );
    return dfd.promise();
  }

  function _getListItemsSuccess(data) {
    var msg =
      ' Current batch of results from List ' +
      listName +
      ' on this site contains ';

    if (data.d.results.length) {
      if (data.d.results.length > 1) {
        msg += data.d.results.length + ' items:<ul>';
        $.each(data.d.results, function (index, value) {
          msg += '<li>' + value.Title + '</li>';
        });
      } else {
        msg += '1 item:<ul>';
        msg += '<li>' + data.d.results[0].Title + '</li>';
      }
      msg += '</ul>';
    } else {
      msg += 'no items';
    }

    if (data.d.__next) {
      msg += '<br />';
      msg +=
        'Results are paged - next set of results available here: <br />' +
        data.d.__next;
    }
    BasicJSRest.Utilities.LogResult(msg);
  }

  // Filter Lookup (Expand)
  function _filterChildren() {
    var parentName = prompt('Get Children for which Parent?', 'Angular');
    var promise = _lim.getChildren(parentName);
    promise.then(
      function (data, status, jqXHR) {
        _filterChildrenSuccess(data, parentName);
      },
      function (jqXHR, status, error) {
        BasicJSRest.Utilities.Fail(error);
      }
    );
  }

  function _filterChildrenSuccess(data, parentName) {
    var msg =
      "The following items have a SampleData value of '" +
      parentName +
      "':<ul>";
    $.each(data.d.results, function (index, value) {
      msg += '<li>' + value.Title + '</li>';
    });
    msg += '</ul>';
    BasicJSRest.Utilities.LogResult(msg);
  }
  // Get List Fields (Expand)
  function _getListFields() {
    var promise = _lm.getListFields();
    promise.then(
      function (data, status, jqXHR) {
        _getListFieldSuccess(data);
      },
      function (jqXHR, status, error) {
        BasicJSRest.Utilities.Fail(error);
      }
    );
  }

  function _getListFieldSuccess(data) {
    var msg =
      'There are ' + data.d.results.length + ' lists on this site.<br />';
    msg += 'Field information:<br />';

    //iterate collection of lists
    $.each(data.d.results, function (index, value) {
      msg += '<li><u>' + value.Title + ' has these fields:</u></li><ul>';

      //iterate fields on each list
      $.each(data.d.results[index].Fields.results, function (index, value) {
        msg += '<li>' + value.Title + '</li>';
      });

      msg += '</ul>';
    });
    msg += '</ul>';
    BasicJSRest.Utilities.LogResult(msg);
  }

  function _clearResults() {
    $('#results').text('');
  }
  //#endregion Private Function

  //#region Public Members
  var publics = {
    readLists: function () {
      _clearResults();
      _readLists();
    },
    readListItems: function () {
      _clearResults();
      _readListItems('Movies');
    },
    readListItemsPaged: function () {
      _clearResults();
      _readListItemsPaged('Movies');
    },
    filterChildren: function () {
      _clearResults();
      _filterChildren();
    },
    getListFields: function () {
      _clearResults();
      _getListFields();
    },
  };
  return publics;
  //#endregion Public Members
};
