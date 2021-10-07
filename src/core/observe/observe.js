"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: 某时橙
 * @Date: 2021-10-05 22:05:34
 * @LastEditTime: 2021-10-07 10:31:35
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue\src\core\observe\observe.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
var dep_1 = __importDefault(require("./dep"));
var Observer = /** @class */ (function () {
    function Observer(value) {
        this.value = value;
        if (Array.isArray(this.value)) {
        }
        else {
            this.walk(value);
        }
    }
    Observer.prototype.walk = function (obj) {
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], val = _b[0], key = _b[1];
            this.detect(obj, key, val);
        }
    };
    Observer.prototype.detect = function (obj, key, val) {
        if (typeof (val) == 'object') { //同时判断数组和对象
            new Observer(val);
        }
        var dep = new dep_1.default();
        Object.defineProperty(obj, key, {
            get: function () {
                dep.depend();
                return val;
            },
            set: function (newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    };
    return Observer;
}());
exports.default = Observer;
