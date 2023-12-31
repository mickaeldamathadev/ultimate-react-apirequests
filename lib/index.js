"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.post = exports.patch = exports.get = exports.del = void 0;
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, status) {
        var _this = _super.call(this) || this;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    return RequestError;
}(Error));
function makeApiRequest(options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, method, data, response, status_1, body, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = options.url, method = options.method, data = options.data;
                    console.log(process.env.REACT_APP_HTTP_SERVER_URL);
                    return [4 /*yield*/, fetch(process.env.REACT_APP_HTTP_SERVER_URL + url, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: data ? JSON.stringify(data) : undefined,
                            credentials: 'include',
                        })];
                case 1:
                    response = _a.sent();
                    status_1 = response.status;
                    return [4 /*yield*/, response.json()];
                case 2:
                    body = _a.sent();
                    if (status_1 > 203) {
                        throw new RequestError(body.error, status_1);
                    }
                    return [2 /*return*/, { data: body, status: status_1 }];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            error: error_1.message || 'An error occurred',
                            status: error_1.status,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function generateNestedUrl(baseUrl, nestedRoutes) {
    var nestedUrl = baseUrl;
    for (var key in nestedRoutes) {
        if (nestedRoutes.hasOwnProperty.call(key, nestedUrl)) {
            var route = nestedRoutes[key];
            nestedUrl += "/".concat(key, "/").concat(route);
        }
    }
    return nestedUrl;
}
/**
   process.env.REACT_APP_HTTP_SERVER_URL
 */
function post(baseUrl, nestedRoutes, data) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = generateNestedUrl(baseUrl, nestedRoutes);
                    return [4 /*yield*/, makeApiRequest({ url: url, method: 'POST', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.post = post;
/**
   process.env.REACT_APP_HTTP_SERVER_URL
 */
function put(baseUrl, nestedRoutes, data) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = generateNestedUrl(baseUrl, nestedRoutes);
                    return [4 /*yield*/, makeApiRequest({ url: url, method: 'PUT', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.put = put;
/**
   process.env.REACT_APP_HTTP_SERVER_URL
 */
function patch(baseUrl, nestedRoutes, data) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = generateNestedUrl(baseUrl, nestedRoutes);
                    return [4 /*yield*/, makeApiRequest({ url: url, method: 'PATCH', data: data })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.patch = patch;
/**
   process.env.REACT_APP_HTTP_SERVER_URL
 */
function get(baseUrl, nestedRoutes) {
    if (nestedRoutes === void 0) { nestedRoutes = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = generateNestedUrl(baseUrl, nestedRoutes);
                    return [4 /*yield*/, makeApiRequest({ url: url, method: 'GET' })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.get = get;
/**
   process.env.REACT_APP_HTTP_SERVER_URL
 */
function del(baseUrl, nestedRoutes) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = generateNestedUrl(baseUrl, nestedRoutes);
                    return [4 /*yield*/, makeApiRequest({ url: url, method: 'DELETE' })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.del = del;
