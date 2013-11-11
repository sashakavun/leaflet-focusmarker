/**
 * L.FocusMarker
 * 0.0.1
 *
 * Focus Marker plugin for Leaflet library
 * http://github.com/keta/L.FocusMarker
 *
 * Copyright 2013, Aleksandr "keta" Kavun
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
(function () {
    "use strict";

    /**
     * Focus marker.
     * @extends {L.CircleMarker}
     * @type {function}
     */
    L.FocusMarker = L.CircleMarker.extend({
        options: {
            "clickable": false,
            "keyboard": false,
            "dispose": true,
            "radius": 40,
            "color": "#f22",
            "opacity": 0.8,
            "duration": 1000, // 1 sec
            "step": 10 // every 10 msec
        },

        /**
         * @constructor
         * @param {L.LatLng} latlng
         * @param {object} options
         */
        initialize: function (latlng, options) {
            L.CircleMarker.prototype.initialize.apply(this, arguments);
            this._baseRadius = this.options.radius;
            this._baseOpacity = this.options.opacity;
            this.options.radius = 0;
            this.options.opacity = 0;
        },

        /**
         * @param {L.Map} map
         */
        onAdd: function (map) {
            L.CircleMarker.prototype.onAdd.apply(this, arguments);
            this.animate();
        },

        /**
         * Removes marker from map.
         * @param {L.Map} map
         * @returns {L.FocusMarker}
         */
        removeFrom: function (map) {
            map.removeLayer(this);
            return this;
        },

        /**
         * Sets marker position.
         * @param {L.LatLng} latlng
         * @returns {L.FocusMarker}
         */
        setLatLng: function (latlng) {
            L.CircleMarker.prototype.setLatLng.apply(this, arguments);
            if (this._map) {
                this.animate();
            }
            return this;
        },

        /**
         * Shows marker.
         * @returns {L.FocusMarker}
         */
        show: function () {
            if (this._map) {
                this.animate();
                this.redraw();
            }
            return this;
        },

        /**
         * Animates marker.
         */
        animate: function () {
            clearInterval(this._animation);
            var radius = this._baseRadius;
            var opacity = this._baseOpacity;
            var self = this;
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) { return callback.apply(); };
            var animation = function (duration, delay, callback) {
                var start = new Date();
                self._animation = setInterval(function () {
                    var progress = (new Date() - start) / duration;
                    if (progress > 1) {
                        progress = 1;
                    }
                    requestAnimationFrame(function () {
                        callback(progress);
                    });
                    if (progress === 1) {
                        self._stopAnimation();
                    }
                }, delay);
            };
            animation(this.options.duration, this.options.step, function (progress) {
                self.setStyle({
                    "radius": Math.max(0, radius - (radius * progress)),
                    "opacity": Math.max(0, opacity - (opacity * progress))
                });
            });
        },

        /**
         * Stops scheduled animation.
         * @private
         */
        _stopAnimation: function () {
            if (this._animation) {
                clearInterval(this._animation);
                this.fire("animationend");
                if (this.options.dispose) {
                    this._map.removeLayer(this);
                }
            }
        }
    });

    /**
     * Focus marker factory.
     * @param {L.LatLng} latlng
     * @param {object} options
     * @returns {L.FocusMarker}
     */
    L.focusMarker = function (latlng, options) {
        return new L.FocusMarker(latlng, options);
    };

    /* Shortcuts */
    L.Marker.Focus = L.FocusMarker;
    L.marker.focus = L.focusMarker;

})();
