# leaflet-ajaxgeojsonlayer

GeoJSON layer with automatic updates based on the bounding box for the current view.
 
## Usage

The module can be loaded as CommonJS module or with a `script` element.
The first parameter is the URL of the service which returns the GeoJSON for the bounding box.

```
  var layer = new L.AjaxGeoJSONLayer('geojson')

  map.addLayer(layer)
```
