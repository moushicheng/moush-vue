var Dep = (function () {
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.removeSub = function (item) {
        var index = this.subs.indexOf(item);
        if (index > -1) {
            return this.subs.splice(index, 1);
        }
    };
    Dep.prototype.depend = function () {
        if (window.target) {
            this.addSub(window.target);
        }
    };
    Dep.prototype.notify = function () {
        var subs = this.subs.slice();
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    };
    return Dep;
}());
export default Dep;
