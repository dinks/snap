
(function () {
  var TravelApi = function () {
    var headersPreset = {
      Accept: 'application/vnd.snap.dev; version=1'
    };

    var getTravelLog = function () {
      var dfd = new jQuery.Deferred();

      $.ajax({
        url:        SnapRoutes.api_trips_path(),
        headers:    headersPreset,
        dataType:   'json'
      }).done(function (data) {
        dfd.resolve(data);
      }).fail(function () {
        dfd.reject();
      });

      return dfd.promise();
    };

    var postTravelPoints = function (points) {
      var dfd = new jQuery.Deferred();

      $.ajax({
        url:        SnapRoutes.api_trips_path(),
        data:       {
          points: points
        },
        headers:    headersPreset,
        dataType:   'json',
        type:       'POST'
      }).done(function (data) {
        dfd.resolve(data);
      }).fail(function () {
        dfd.reject();
      });

      return dfd.promise();
    };

    return {
      travelLog: getTravelLog,
      postTravelPoints: postTravelPoints
    };
  };

  window.travelApi = new TravelApi();
}());
