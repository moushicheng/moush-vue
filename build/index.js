import Observer from "./src/core/observe/observe";
import "./declare";
var moushVue = (function () {
    function moushVue(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        new Observer(this.$data);
    }
    return moushVue;
}());
var app = new moushVue({
    el: "#app",
    data: {
        age: 1
    }
});
