"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserSantry = void 0;
var core_1 = require("@santry/core");
var package_json_1 = __importDefault(require("../package.json"));
var utils_1 = require("@santry/utils");
var BrowserSantry = /** @class */ (function (_super) {
    __extends(BrowserSantry, _super);
    function BrowserSantry(dsn, options) {
        var _this = _super.call(this, dsn, options) || this;
        _this.platform = 'browser';
        _this.sdk = { name: package_json_1.default.name, version: package_json_1.default.version };
        return _this;
    }
    BrowserSantry.prototype.captureError = function (error) {
        this.createEvent(error, utils_1.parseUserAgentInfo(window.navigator.userAgent));
    };
    BrowserSantry.prototype.captureMessage = function (message) {
        this.createEvent(message, utils_1.parseUserAgentInfo(window.navigator.userAgent));
    };
    BrowserSantry.prototype.handleUncaughtError = function (error) {
        return;
    };
    BrowserSantry.prototype.handleUncaughtRejection = function (rejection) {
        return;
    };
    return BrowserSantry;
}(core_1.BaseSantry));
exports.BrowserSantry = BrowserSantry;
