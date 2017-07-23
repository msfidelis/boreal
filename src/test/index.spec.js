'use strict ';

const path = require('path');
const fs = require('fs');
var db = require('../boreal/v1/libs/connections/write');

const lab = exports.lab = require('lab').script();

global.expect = require('chai').expect;
global.assert = require('chai').assert;

global.it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;
global.after = lab.after;
global.afterEach = lab.afterEach;
global.db = db;

global.server = require('../index');