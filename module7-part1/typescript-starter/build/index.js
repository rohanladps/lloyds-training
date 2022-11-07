"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var observable1 = (0, rxjs_1.of)(1, 2, 3);
var observable2 = (0, rxjs_1.of)(4, 5, 6);
var source = observable1.pipe((0, operators_1.concatWith)(observable2));
source.subscribe(function (x) { return console.log(x); });
