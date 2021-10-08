var Watcher = (function () {
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
export default Watcher;
var bailRE = /[^\w.$]/;
export function parsePath(path) {
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
