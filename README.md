# uk-time

A node.js module purely for converting to and from UK time.

## Installation

```bash
$ npm install uk-time
```

## Usage

There are two methods:

* `toUkTime(dateTimeString, [outputStringFormat])` - parses the input string as a UTC datetime and converts it to a string of the equivalent datetime in the UK. It will format the output string with the given template, defaulting to ISO format.
* `fromUkTime(dateTimeString, [outputStringFormat])` - parses the input string as a UK datetime and converts it to a string of the equivalent UTC datetime. It will format the output string with the given template, defaulting to ISO format.

### Examples
```js
const convert = require('uk-time');

// Basic to UK (from UTC) usage
convert.toUKTime('2014-01-01T12:00:00Z');
// 2014-01-01T12:00:00Z

// Basic from UK (to UTC) usage
convert.fromUKTime('2014-08-01T13:00:00Z');
// 2014-08-01T12:00:00Z

// Format output of to UK (from UTC) usage
convert.toUKTime('2014-08-01T12:00:00Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT');
// Friday, August 1st, 2014, 13:00:00 PM

// Format output of to UK (from UTC) usage
convert.fromUKTime('2014-08-01T13:00:00Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT');
// Friday, August 1st, 2014, 12:00:00 PM
```
## Formatting

Formatting of output strings is done using [dateFormat](https://github.com/felixge/node-dateformat). Any masks used with dateFormat will work with uk-time.
