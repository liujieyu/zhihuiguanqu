/* global $ */

'use strict'

if (typeof module !== 'undefined' && module.exports) {
  var L = require('leaflet')
}

function buildUrl () {
  return this._url + '?bounds=' + this._map.getBounds().toBBoxString()
}

function jqueryFetch (url) {
  return new Promise(function (resolve, reject) {
    $.ajax(url, {
      headers: {
        accept: 'application/json'
      }
    }).done(function (data) {
      resolve(data)
    }).fail(function (xhr, status, err) {
      reject(err)
    })
  })
}

/**
 * Layer based on dynamic loaded GeoJSON data
 * @param url
 * @param options
 */
var AjaxGeoJSONLayer = L.Layer.extend({
  initialize: function (url, options) {
    this._url = url
    this._options = options || {}
    this._layers = {}
    this._enabled = true
    this._geoJsonLayer = null

    this._options.geoJsonLayers = this._options.geoJsonLayers || {}
    this._options.buildUrl = this._options.buildUrl || buildUrl.bind(this)
    this._options.fetch = this._options.fetch || jqueryFetch

    this._updateBindThis = this.update.bind(this)
  },

  enable: function () {
    this._enabled = true

    if (this._geoJsonLayer) {
      this.addLayer(this._geoJsonLayer)
    }
  },

  disable: function () {
    this._enabled = false

    if (this._geoJsonLayer) {
      this.removeLayer(this._geoJsonLayer)
    }
  },

  enabled: function () {
    return this._enabled
  },

  onAdd: function (map) {
    this._map = map

    map.on('moveend', this._updateBindThis)

    this.update()
  },

  onRemove: function (map) {
    this._map = null

    map.off('moveend', this._updateBindThis)

    map.removeLayer(this._geoJsonLayer)
  },

  addLayer: function (layer) {
    var id = this.getLayerId(layer)

    this._layers[id] = layer

    if (this._map) {
      this._map.addLayer(layer)
    }

    return this
  },

  getLayers: function () {
    return this._geoJsonLayer ? this._geoJsonLayer.getLayers() : []
  },

  getLayerId: function (layer) {
    return L.stamp(layer)
  },

  update: function () {
    var self = this

    if (!this._enabled) {
      return
    }

    this._options.fetch(self._options.buildUrl()).then(function (data) {
      if (self._geoJsonLayer) {
        self._map.removeLayer(self._geoJsonLayer)
      }

      self._geoJsonLayer = L.geoJson(data, self._options.geoJsonLayers)

      self.addLayer(self._geoJsonLayer)

      self.fireEvent('update', self._geoJsonLayer)
    })
  }
})

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AjaxGeoJSONLayer
} else {
  L.AjaxGeoJSONLayer = AjaxGeoJSONLayer
}
