/* eslint-disable */
window = require('global/window')
/* eslint-enable */
var test = require('tape')
var GetUserMediaToText = require('./index')

test('module exports a function', function (t) {
  t.equal(typeof GetUserMediaToText, 'function')
  t.end()
})
