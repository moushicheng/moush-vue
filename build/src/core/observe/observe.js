import Dep from "./dep";
var Observer = (function () {
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
        if (typeof (val) == 'object') {
            new Observer(val);
        }
        var dep = new Dep();
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
export default Observer;
