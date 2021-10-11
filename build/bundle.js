/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./declare.ts":
/*!********************!*\
  !*** ./declare.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () { });\r\n\n\n//# sourceURL=webpack://moush-vue/./declare.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/core/observe/observe */ \"./src/core/observe/observe.ts\");\n/* harmony import */ var _src_core_complier_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/core/complier/index */ \"./src/core/complier/index.ts\");\n/* harmony import */ var _declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./declare */ \"./declare.ts\");\n\r\n\r\n\r\nvar moushVue = (function () {\r\n    function moushVue(options) {\r\n        this.$el = document.querySelector(options.el);\r\n        this.$data = options.data;\r\n        new _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$data);\r\n        new _src_core_complier_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n    }\r\n    return moushVue;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moushVue);\r\nvar app = new moushVue({\r\n    el: \"#app\",\r\n    data: {\r\n        age: 1\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://moush-vue/./index.ts?");

/***/ }),

/***/ "./src/core/complier/index.ts":
/*!************************************!*\
  !*** ./src/core/complier/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _observe_watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe/watcher */ \"./src/core/observe/watcher.ts\");\n\r\nvar Complier = (function () {\r\n    function Complier(vm) {\r\n        this.$vm = vm;\r\n        this.run(vm.$el);\r\n    }\r\n    Complier.prototype.run = function (node) {\r\n        var _this = this;\r\n        if (node.nodeType == 1) {\r\n            node.childNodes.forEach(function (childNode) {\r\n                _this.run(childNode);\r\n            });\r\n        }\r\n        if (node.nodeType == 3) {\r\n            var reg = /{{(.+?)}}/g;\r\n            var match = void 0;\r\n            while (match = reg.exec(node.nodeValue)) {\r\n                var raw = match[0];\r\n                var key = match[1].trim();\r\n                var w = new _observe_watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$vm, raw, key, function (val, oldVal) {\r\n                    node.nodeValue = node.nodeValue.replace(oldVal, val);\r\n                });\r\n                w.update();\r\n            }\r\n        }\r\n    };\r\n    return Complier;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Complier);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/complier/index.ts?");

/***/ }),

/***/ "./src/core/observe/dep.ts":
/*!*********************************!*\
  !*** ./src/core/observe/dep.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Dep = (function () {\r\n    function Dep() {\r\n        this.subs = [];\r\n    }\r\n    Dep.prototype.addSub = function (sub) {\r\n        this.subs.push(sub);\r\n    };\r\n    Dep.prototype.removeSub = function (item) {\r\n        var index = this.subs.indexOf(item);\r\n        if (index > -1) {\r\n            return this.subs.splice(index, 1);\r\n        }\r\n    };\r\n    Dep.prototype.depend = function () {\r\n        if (window.target) {\r\n            console.log('@dep depend');\r\n            this.addSub(window.target);\r\n        }\r\n    };\r\n    Dep.prototype.notify = function () {\r\n        var subs = this.subs;\r\n        for (var i = 0, l = subs.length; i < l; i++) {\r\n            subs[i].update();\r\n        }\r\n    };\r\n    return Dep;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dep);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/observe/dep.ts?");

/***/ }),

/***/ "./src/core/observe/observe.ts":
/*!*************************************!*\
  !*** ./src/core/observe/observe.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/core/observe/dep.ts\");\n\r\nvar Observer = (function () {\r\n    function Observer(value) {\r\n        this.value = value;\r\n        if (Array.isArray(this.value)) {\r\n        }\r\n        else {\r\n            this.walk(value);\r\n        }\r\n    }\r\n    Observer.prototype.walk = function (obj) {\r\n        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], val = _b[1];\r\n            this.detect(obj, key, val);\r\n        }\r\n    };\r\n    Observer.prototype.detect = function (obj, key, val) {\r\n        if (typeof (val) == 'object') {\r\n            new Observer(val);\r\n            return;\r\n        }\r\n        var dep = new _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        Object.defineProperty(obj, key, {\r\n            get: function () {\r\n                console.log('in getter', val, dep);\r\n                dep.depend();\r\n                return val;\r\n            },\r\n            set: function (newVal) {\r\n                console.log('in setter', val, newVal);\r\n                if (val === newVal) {\r\n                    return;\r\n                }\r\n                val = newVal;\r\n                dep.notify();\r\n            }\r\n        });\r\n    };\r\n    return Observer;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observer);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/observe/observe.ts?");

/***/ }),

/***/ "./src/core/observe/watcher.ts":
/*!*************************************!*\
  !*** ./src/core/observe/watcher.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"parsePath\": () => (/* binding */ parsePath)\n/* harmony export */ });\nvar Watcher = (function () {\r\n    function Watcher(vm, initVal, expOrFn, cb) {\r\n        this.vm = vm;\r\n        this.cb = cb;\r\n        this.getter = parsePath(expOrFn);\r\n        this.value = this.get();\r\n        this.value = initVal;\r\n    }\r\n    Watcher.prototype.get = function () {\r\n        window.target = this;\r\n        var value = this.getter(this.vm.$data);\r\n        window.target = undefined;\r\n        return value;\r\n    };\r\n    Watcher.prototype.update = function () {\r\n        console.log('@watcher update');\r\n        var oldValue = this.value;\r\n        this.value = this.getter(this.vm.$data);\r\n        this.cb.call(this.vm, this.value, oldValue);\r\n    };\r\n    return Watcher;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Watcher);\r\nvar bailRE = /[^\\w.$]/;\r\nfunction parsePath(path) {\r\n    if (bailRE.test(path)) {\r\n        return;\r\n    }\r\n    var segments = path.split('.');\r\n    return function (obj) {\r\n        for (var i = 0; i < segments.length; i++) {\r\n            if (!obj)\r\n                return;\r\n            obj = obj[segments[i]];\r\n        }\r\n        return obj;\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/observe/watcher.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;