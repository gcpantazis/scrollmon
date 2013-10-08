// Scrollmon
// =========
//
// * **Version:** 0.0.1
// * **Author:** George Pantazis

'use strict';

(function() {

  var ScrollMon = function() {

    var self = this;

    window.addEventListener('resize', function(){
      self._checkAll();
    });

    window.addEventListener('scroll', function(){
      self._checkAll();
    });

    return self;
  };

  ScrollMon.prototype = {

    constructor: ScrollMon,
    watches: {},

    _checkActive: function(el) {

      var elRect = el.getBoundingClientRect();
        // winRect = document.documentElement.getBoundingClientRect();
        // isNearBottom = winRect.bottom - elRect.bottom < 160 && $(document).height() - ($(window).scrollTop() + $(window).height()) < 160;

      if (elRect.top < 160 && elRect.top > 0) {
        return true;
      }

      return false;
    },

    _checkAll: function() {

      var self = this;

      for (var i in self.watches) {

        var watch = self.watches[i];

        if (self._checkActive(watch.el)) {

          for (var j in watch.subscriptions) {
            watch.subscriptions[j]();
          }
        }
      }

      return self;
    },

    watch: function(el, id) {

      var self = this;

      if (!self.watches[id]) {
        self.watches[id] = {
          el: el,
          subscriptions: []
        };
        self._checkAll();
      }

      return self;
    },

    subscribe: function(id, cb) {

      var self = this,
        watchObj = self.watches[id];

      if (watchObj) {
        watchObj.subscriptions.push(cb);
      }

      return self;
    }

  };

  if (typeof define === 'function' && define.amd) {
    define(['scrollmon'], function() {
      return ScrollMon;
    });
  } else {
    window.StickyStacky = ScrollMon;
  }
})();