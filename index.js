"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var observe_1 = __importDefault(require("./src/core/observe/observe"));
var moushVue = /** @class */ (function () {
    function moushVue(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        new observe_1.default(this.$data); //使data内部数据可观测
    }
    return moushVue;
}());
exports.default = moushVue;
