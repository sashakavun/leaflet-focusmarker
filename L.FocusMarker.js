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
            clickable: false,
            keyboard: false,
            dispose: true,
            radius: 40,
            color: "#f22",
            opacity: 0.8,
            duration: 20
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
                this.redraw();
                this.animate();
            }
            return this;
        },

        /**
         * Animates marker.
         */
        animate: function () {
            this._stopAnimation();
            var radius = this._baseRadius;
            var opacity = this._baseOpacity;
            var step = opacity / radius;
            var self = this;
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return setTimeout(callback, self.options.duration);
                };
            var animation = function () {
                if (self._map) {
                    radius = Math.max(0, radius - 0.4);
                    opacity = Math.max(0, opacity - step);
                    self.setStyle({
                        "radius": radius,
                        "opacity": opacity
                    });
                    if (opacity || radius) {
                        self._animation = requestAnimationFrame(animation);
                    } else {
                        self.fire("animationend");
                        if (self.options.dispose) {
                            self._map.removeLayer(self);
                        }
                    }
                }
            };
            animation();
        },

        /**
         * Stops scheduled animation.
         * @private
         */
        _stopAnimation: function () {
            if (this._animation) {
                var cancelAnimationFrame = window.cancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    clearTimeout;
                cancelAnimationFrame(this._animation);
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
    L.Marker.Focus = L.Marker.Focus;
    L.marker.focus = L.focusMarker;

})();
