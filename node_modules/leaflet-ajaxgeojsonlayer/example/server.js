var express = require('express')
var fs = require('fs')
var path = require('path')
var turfEnvelope = require('@turf/envelope')
var turfHelpers = require('@turf/helpers')
var turfIntersect = require('@turf/intersect')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, '..')))

var features = JSON.parse(fs.readFileSync('example.geojson').toString())

app.get('/geojson', function (req, res, next) {
  if (!req.query.bounds) {
    return next()
  }

  var coordinates = req.query.bounds
    .split(',')
    .map(function (v) {
      return parseFloat(v)
    })

  var line = turfHelpers.lineString([coordinates.slice(0, 2), coordinates.slice(2, 4)])
  var bbox = turfEnvelope(line)

  var filtered = features.features.filter(function (feature) {
    try {
      return turfIntersect(feature, bbox)
    } catch (e) {
      return false
    }
  })

  res.json(turfHelpers.featureCollection(filtered))
})

app.listen(8080, function () {
  console.log('example is running at http://localhost: ' + this.address().port + '/')
})
