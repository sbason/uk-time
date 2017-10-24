# uk-time

A Javascript module purely for converting to and from UK time.

## Installation

```bash
$ npm install uk-time
```

## Usage

There are two methods:

* `toUKTime(dateTimeString, [outputStringTemplate])` - parses the input string as a UTC datetime and converts it to a string of the equivalent datetime in the UK. It will format the output string with the optional template, defaulting to ISO format.
* `fromUKTime(dateTimeString, [outputStringTemplate])` - parses the input string as a UK datetime and converts it to a string of the equivalent UTC datetime. It will format the output string with the given optional template, defaulting to ISO format.

### Examples

```js
const { toUKTime, fromUKTime } = require('uk-time'); //CommonJS
import { toUKTime, fromUKTime } from 'uk-time'; //ES6 modules

// Basic to UK (from UTC) usage
toUKTime('2014-01-01T12:00:00Z');
// 2014-01-01T12:00:00Z

// Basic from UK (to UTC) usage
fromUKTime('2014-08-01T13:00:00Z');
// 2014-08-01T12:00:00Z

// Format output of to UK (from UTC) usage
toUKTime('2014-08-01T12:00:00Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT');
// Friday, August 1st, 2014, 13:00:00 PM

// Format output of to UK (from UTC) usage
fromUKTime('2014-08-01T13:00:00Z', 'dddd, mmmm dS, yyyy, h:MM:ss TT');
// Friday, August 1st, 2014, 12:00:00 PM
```

## Formatting

Formatting of output strings is done using [dateFormat](https://github.com/felixge/node-dateformat). Any masks used with dateFormat will work with uk-time.
