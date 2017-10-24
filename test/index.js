const convert = require('../');
const assert = require('assert');

describe('uk-time', () => {

  describe('to UK time (from UTC)', () => {

    it('does not add an extra hour for times not in BST', () => {
      assert.equal(convert.toUKTime('2014-01-01T12:00:00Z'), '2014-01-01T12:00:00Z');
    });

    it('adds an hour for times in BST', () => {
      assert.equal(convert.toUKTime('2014-08-01T12:00:00Z'), '2014-08-01T13:00:00Z');
    });

    it('formats the output as required', () => {
      assert.equal(convert.toUKTime('2017-10-24T20:44:21Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT'), 'Tuesday, October 24th, 2017, 9:44:21 PM');
    });

    it('returns undefined if a invalid date string is passed in', () => {
      assert.equal(convert.toUKTime('sdfsfs', 'dddd, mmmm dS, yyyy, h:MM:ss TT'), undefined);
    });

    describe('beginning of BST', () => {

      it('does not add an hour for times just before BST starts', () => {
        assert.equal(convert.toUKTime('2014-03-30T00:59:00Z'), '2014-03-30T00:59:00Z');
      });

      it('adds an extra hour for times just on the BST start time', () => {
        assert.equal(convert.toUKTime('2014-03-30T01:00:00Z'), '2014-03-30T02:00:00Z');
      });

      it('adds an extra hour for times just after BST starts', () => {
        assert.equal(convert.toUKTime('2014-03-30T01:01:00Z'), '2014-03-30T02:01:00Z');
      });

    });

    describe('end of BST', () => {

      it('adds an hour for times just before BST ends', () => {
        assert.equal(convert.toUKTime('2013-10-27T00:59:00Z'), '2013-10-27T01:59:00Z');
      });

      it('does not add an hour for times just on the BST end time', () => {
        assert.equal(convert.toUKTime('2013-10-27T01:00:00Z'), '2013-10-27T01:00:00Z');
      });

      it('does not add an hour for times just after BST ends', () => {
        assert.equal(convert.toUKTime('2013-10-27T01:01:00Z'), '2013-10-27T01:01:00Z');
      });

    });

  });

  describe('from UK time (to UTC)', () => {

    it('does not subtract an extra hour for times not in BST', () => {
      assert.equal(convert.fromUKTime('2014-01-01T12:00:00Z'), '2014-01-01T12:00:00Z');
    });

    it('subtracts an hour for times in BST', () => {
      assert.equal(convert.fromUKTime('2014-08-01T13:00:00Z'), '2014-08-01T12:00:00Z');
    });

    it('formats the output as required', () => {
      assert.equal(convert.fromUKTime('2017-10-24T21:44:21Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT'), 'Tuesday, October 24th, 2017, 8:44:21 PM');
    });

    describe('beginning of BST', () => {

      it('does not subtract an hour for times just before BST starts', () => {
        assert.equal(convert.fromUKTime('2014-03-30T00:59:00Z'), '2014-03-30T00:59:00Z');
      });

      it('subtracts an hour for times just on the BST start time', () => {
        assert.equal(convert.fromUKTime('2014-03-30T02:00:00Z'), '2014-03-30T01:00:00Z');
      });

      it('subtracts an hour for times just after BST starts', () => {
        assert.equal(convert.fromUKTime('2014-03-30T02:01:00Z'), '2014-03-30T01:01:00Z');
      });

    });

    describe('end of BST', () => {

      it('subtracts an hour for times just before BST ends', () => {
        assert.equal(convert.fromUKTime('2013-10-27T00:59:00Z'), '2013-10-26T23:59:00Z');
      });

      it('does not subtract an hour for times just on the BST end time', () => {
        assert.equal(convert.fromUKTime('2013-10-27T01:00:00Z'), '2013-10-27T01:00:00Z');
      });

      it('does not subtract an hour for times just after BST ends', () => {
        assert.equal(convert.fromUKTime('2013-10-27T01:01:00Z'), '2013-10-27T01:01:00Z');
      });

    });

  });

});
