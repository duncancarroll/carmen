var termops = require('../lib/util/termops');
var token = require('../lib/util/token');
var test = require('tape');

test('tokenizes basic strings', function(assert) {
    assert.deepEqual(termops.tokenize('foo'), ['foo']);
    assert.deepEqual(termops.tokenize('foo bar'), ['foo', 'bar']);
    assert.deepEqual(termops.tokenize('foo-bar'), ['foo', 'bar']);
    assert.deepEqual(termops.tokenize('69-150'), ['69-150']);
    assert.deepEqual(termops.tokenize('4-10'), ['4-10']);
    assert.deepEqual(termops.tokenize('5-02A'), ['5-02a']);
    assert.deepEqual(termops.tokenize('23-'), ['23']);
    assert.deepEqual(termops.tokenize('San José'), ['san', 'jose']);
    assert.deepEqual(termops.tokenize('San José'), ['san', 'jose']);
    assert.deepEqual(termops.tokenize('Chamonix-Mont-Blanc'), ['chamonix','mont','blanc']);
    assert.deepEqual(termops.tokenize('Москва'), ['moskva']);
    assert.deepEqual(termops.tokenize('京都市'), ['jing','du','shi']);
    assert.end();
});
test('tokenizes lonlat', function(assert) {
    assert.deepEqual(termops.tokenize('40,0', true), [40,0]);
    assert.deepEqual(termops.tokenize('40.00000,-40.31200', true), [40,-40.312]);
    assert.deepEqual(termops.tokenize('-120.9129102983109, 45.312312', true), [-120.9129102983109,45.312312]);
    assert.deepEqual(termops.tokenize('14th 15th', true), ['14th','15th']);
    assert.end();
});
test('edge cases - empty string', function(assert) {
    assert.deepEqual(termops.tokenize(''), []);
    assert.end();
});

