"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dep = /** @class */ (function () {
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    // 删除一个依赖
    Dep.prototype.removeSub = function (item) {
        var index = this.subs.indexOf(item);
        if (index > -1) {
            return this.subs.splice(index, 1);
        }
    };
    // 添加一个依赖
    Dep.prototype.depend = function () {
        if (window.target) {
            this.addSub(window.target);
        }
    };
    // 通知所有依赖更新
    Dep.prototype.notify = function () {
        var subs = this.subs.slice();
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    };
    return Dep;
}());
exports.default = Dep;
