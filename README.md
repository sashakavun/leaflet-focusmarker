L.FocusMarker
=============

Shrinking circle marker plugin for Leaflet.

A simple marker for use when you want to draw the user's attention at some place on the map.

Check out the [example](http://keta.github.io/leaflet-focusmarker/example.html).

Browser Support
---------------

Plugin is tested and approved to work in the following browsers:

* Chrome 29+
* Firefox 23+
* Internet Explorer 6+
* Opera 12.16, 16+
* Safari 5.1.16 (Windows)

Usage
-----

Add marker to the map:

    ```js
    var map = L.map("map");
    var latlng = [ 45.033, 38.967 ];
    L.focusMarker(latlng).addTo(map);
    ```

Marker will remove itself from map automatically after disappearing.

If you do not want marker to be auto-removed, set `dispose` option to `false`:

    ```js
    var map = L.map("map");
    var latlng1 = [ 51.505, -0.09 ];
    var latlng2 = [ 45.033, 38.967 ];
    var focus = L.focusMarker(latlng1, { "dispose": false });
    focus.addTo(map);

    // some lines below:
    focus.setLatLng(latlng2);
    ```

Marker will show again when its coordinates changed or on `show()` method call.

Marker fires `animationend` event after disappearing.


Development
-----------

Project requires `npm` for development environment.

To set up, run following command in the project's directory:

    ```
    npm install
    ```

To build minified file, run `build` Grunt task in the project's directory:

    ```
    grunt build
    ```
