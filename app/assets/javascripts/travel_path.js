
/* global Snap */

(function () {
  'use strict';
  var MySnap = function () {
    var createdPath       = null;
    var createdPathLength = null;
    var pointerSvg        = null;
    var snp               = null;
    var startLocation     = null;
    var endLocation       = null;
    var startCircle       = null;
    var endCircle         = null;
    var endCircleFilter   = null;

    var init = function () {
      snp = Snap('#travel-path');

      endCircleFilter = snp.filter('').attr({
        id: 'end-circle-filter'
      });

      var tredPath = "M62.9 34.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1";

      var tredPath2 = "m62.9,34.9c0,0 -29,82 71,72c100,-10 70,48 179,26c109,-22 4,-68 136,-67c132,1 134,48 124,30";

      var tredPath3 = "m62.9,34.9c0,0 -17,114 36,101c53,-13 40,-33 107,-49c67,-16 136,1 179,30c43,29 144,73 184,-15";

      var pathsAvailable = [tredPath, tredPath2, tredPath3];
      var randomPath = pathsAvailable[Math.round((pathsAvailable.length - 1) * Math.random())];

      createdPath = snp.path(randomPath).attr({
        id: "squiggle",
        fill: "none",
        strokeWidth: "10",
        stroke: "#ffffff",
        strokeMiterLimit: "10",
        strokeDasharray: "9 9",
        strokeDashOffset: "988.01"
      });

      createdPathLength = Snap.path.getTotalLength(createdPath.attr("d"));

      createdPath.attr({
          stroke: '#3090C7',
          strokeWidth: 5,
          fill: 'none',
          // Animate Path
          "stroke-dasharray": "22 6",
          "stroke-dashoffset": "10"
      });
      //.animate({"stroke-dashoffset": 10}, 2500, mina.easeinout);
    };

    var createPointer = function () {
      var pointer = snp.g().transform("translate(0 -1028.4)");

      pointer.add(pointer.path("m12.031 1030.4c-3.8657 0-6.9998 3.1-6.9998 7 0 1.3 0.4017 2.6 1.0938 3.7 0.0334 0.1 0.059 0.1 0.0938 0.2l4.3432 8c0.204 0.6 0.782 1.1 1.438 1.1s1.202-0.5 1.406-1.1l4.844-8.7c0.499-1 0.781-2.1 0.781-3.2 0-3.9-3.134-7-7-7zm-0.031 3.9c1.933 0 3.5 1.6 3.5 3.5 0 2-1.567 3.5-3.5 3.5s-3.5-1.5-3.5-3.5c0-1.9 1.567-3.5 3.5-3.5z").attr({
        fill: "#c0392b"
      }));

      pointer.add(pointer.path("m12.031 1.0312c-3.8657 0-6.9998 3.134-6.9998 7 0 1.383 0.4017 2.6648 1.0938 3.7498 0.0334 0.053 0.059 0.105 0.0938 0.157l4.3432 8.062c0.204 0.586 0.782 1.031 1.438 1.031s1.202-0.445 1.406-1.031l4.844-8.75c0.499-0.963 0.781-2.06 0.781-3.2188 0-3.866-3.134-7-7-7zm-0.031 3.9688c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5z").attr({
        fill: "#e74c3c"
      }).transform("translate(0 1028.4)"));

      pointerSvg = snp.svg().add(pointer);
    };

    var setLocations = function (source, destination) {
      var circleAttrs = {
                          r: 10,
                          fill: '#fda74a',
                          stroke: '#369de1'
                        };

      if (startCircle === null) {
        startCircle = snp
                      .circle(65, 35, 10);
      }
      startCircle.animate(circleAttrs, 1000, mina.easeinout);

      if (endCircle === null) {
        endCircle   = snp
                      .circle(572, 95, 10);
      }
      endCircle.animate(circleAttrs, 1000, mina.easeinout);

      if (startLocation === null) {
        startLocation = snp.text(80, 25, '');
      }
      startLocation.attr({
        text: source
      });

      if (endLocation === null) {
        endLocation = snp.text(550, 125, '');
      }
      endLocation.attr({
        text: destination
      });
    };

    var start = function (pointX, pointY, maxPoints, callback) {
      if (pointerSvg === null) {
        createPointer();
      }

      var startPoint  = createdPathLength * (pointX / maxPoints);
      var endPoint    = createdPathLength  * (pointY / maxPoints);

      setTimeout(function() {
          Snap.animate(startPoint, endPoint, function(value) {
              var movePoint = createdPath.getPointAtLength(value);
              pointerSvg.attr({ x: movePoint.x - 10, y: movePoint.y - 20 });
          }, 3500, mina.easeinout, function () {
            if (callback) {
              callback();
            }
          });
      });
    };

    var highlightEnd = function (lastLog, callback) {
      endCircle.animate({
        r: 30,
        fill:   '#77dd66',
        stroke: '#3333ff'
      }, 1000, mina.bounce, function () {
        callback();
      });
    };

    return {
      init:         init,
      start:        start,
      setLocations: setLocations,
      highlightEnd: highlightEnd
    };
  };

  window.mySnap = new MySnap();
}());

$(document).ready(function() {
  if($('#travel-path').length) {
    var lastLog = null;

    var plotSnap = function (data) {
      lastLog = data.trips[data.trips.length - 1];
      mySnap.setLocations(lastLog.source.name, lastLog.destination.name);
      mySnap.start(lastLog.x, lastLog.y, data.maxPoints);
    };

    var finishedTrip = function (data) {
      var dfd = new jQuery.Deferred();

      mySnap.start(lastLog.x, lastLog.y, data.maxPoints, function () {
        mySnap.highlightEnd(lastLog, function () {
          dfd.resolve(data);
        });
      });

      return dfd.promise();
    };

    mySnap.init();

    travelApi.travelLog().then(function (data) {
      plotSnap(data);
    });

    $('body').delegate('.plot-progress', 'click', function () {
      var points = Math.round(50 * Math.random());
      travelApi.postTravelPoints(points).then(function (data) {
        currentLog = data.trips[data.trips.length - 1];
        if (lastLog.source.id !== currentLog.source.id) {
          lastLog = data.trips[data.trips.length - 2];
          finishedTrip(data).then(function () {
            setTimeout(function () {
              plotSnap(data);
            }, 200);
          });
        } else {
          plotSnap(data);
        }
      });
    });
  }
});
