"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLevel = exports.setContext = exports.captureMessage = exports.captureError = exports.init = void 0;
var utils_1 = require("@santry/utils");
var browserSantry_1 = require("./browserSantry");
var core_1 = require("@santry/core");
exports.init = function (dsn, options) {
    core_1.initWithClass(browserSantry_1.BrowserSantry, dsn, options);
};
exports.captureError = function (error) {
    var santry = utils_1.getGlobalObject().santry;
    santry.hub.captureError(error);
};
exports.captureMessage = function (message) {
    var santry = utils_1.getGlobalObject().santry;
    santry.hub.captureMessage(message);
};
exports.setContext = function (title, context) {
    var santry = utils_1.getGlobalObject().santry;
    santry.hub.setContext(title, context);
};
exports.setLevel = function (level) {
    var santry = utils_1.getGlobalObject().santry;
    santry.hub.setLevel(level);
};
