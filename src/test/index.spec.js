'use strict ';

let lab = exports.lab = require('lab').script();

global.expect = require('chai').expect;
global.assert = require('chai').assert;

global.it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;

global.server = require('../index');