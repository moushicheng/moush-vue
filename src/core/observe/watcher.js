"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePath = void 0;
var Watcher = /** @class */ (function () {
    function Watcher(vm, expOrFn, cb) {
        this.vm = vm;
        this.cb = cb;
        this.getter = parsePath(expOrFn);
        this.value = this.get();
    }
    Watcher.prototype.get = function () {
        window.target = this;
        var vm = this.vm;
        var value = this.getter.call(vm, vm);
        window.target = undefined;
        return value;
    };
    Watcher.prototype.update = function () {
        var oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue);
    };
    return Watcher;
}());
exports.default = Watcher;
/**
 * Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }
    var segments = path.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj)
                return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}
exports.parsePath = parsePath;
