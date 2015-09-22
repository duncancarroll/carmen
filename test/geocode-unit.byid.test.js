// byId debug geocoding queries

var tape = require('tape');
var Carmen = require('..');
var index = require('../lib/index');
var context = require('../lib/context');
var mem = require('../lib/api-mem');
var queue = require('queue-async');
var addFeature = require('../lib/util/addfeature');

var conf = {
    country: new mem(null, function() {}),
    place: new mem(null, function() {})
};
var c = new Carmen(conf);

tape('index country', function(t) {
    addFeature(conf.country, {
        _id:1,
        _text:'china',
        _zxy:['6/32/32'],
        _center:[0,0]
    }, t.end);
});

tape('index place', function(t) {
    addFeature(conf.place, {
        _id:1,
        _text:'chicago',
        _zxy:['6/32/32'],
        _center:[0,0]
    }, t.end);
});

tape('query byid', function(t) {
    c.geocode('country.1', {}, function(err, res) {
        t.ifError(err);
        t.equals(res.features.length, 1);
        t.equals(res.features[0].place_name, 'china', 'found by id');
        t.equals(res.features[0].id, 'country.1', 'found by id');
        t.end();
    });
});

tape('query byid', function(t) {
    c.geocode('place.1', {}, function(err, res) {
        t.ifError(err);
        t.equals(res.features.length, 1);
        t.equals(res.features[0].place_name, 'chicago', 'found by id');
        t.equals(res.features[0].id, 'place.1', 'found by id');
        t.end();
    });
});

tape('index.teardown', function(assert) {
    index.teardown();
    context.getTile.cache.reset();
    assert.end();
});

