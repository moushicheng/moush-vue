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

/***/ "./build/declare.js":
/*!**************************!*\
  !*** ./build/declare.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () { });\r\n\n\n//# sourceURL=webpack://moush-vue/./build/declare.js?");

/***/ }),

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/core/observe/observe */ \"./build/src/core/observe/observe.js\");\n/* harmony import */ var _declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./declare */ \"./build/declare.js\");\n\r\n\r\nvar moushVue = (function () {\r\n    function moushVue(options) {\r\n        this.$el = document.querySelector(options.el);\r\n        this.$data = options.data;\r\n        new _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$data);\r\n    }\r\n    return moushVue;\r\n}());\r\nvar app = new moushVue({\r\n    el: \"#app\",\r\n    data: {\r\n        age: 1\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://moush-vue/./build/index.js?");

/***/ }),

/***/ "./build/src/core/observe/dep.js":
/*!***************************************!*\
  !*** ./build/src/core/observe/dep.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Dep = (function () {\r\n    function Dep() {\r\n        this.subs = [];\r\n    }\r\n    Dep.prototype.addSub = function (sub) {\r\n        this.subs.push(sub);\r\n    };\r\n    Dep.prototype.removeSub = function (item) {\r\n        var index = this.subs.indexOf(item);\r\n        if (index > -1) {\r\n            return this.subs.splice(index, 1);\r\n        }\r\n    };\r\n    Dep.prototype.depend = function () {\r\n        if (window.target) {\r\n            this.addSub(window.target);\r\n        }\r\n    };\r\n    Dep.prototype.notify = function () {\r\n        var subs = this.subs.slice();\r\n        for (var i = 0, l = subs.length; i < l; i++) {\r\n            subs[i].update();\r\n        }\r\n    };\r\n    return Dep;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dep);\r\n\n\n//# sourceURL=webpack://moush-vue/./build/src/core/observe/dep.js?");

/***/ }),

/***/ "./build/src/core/observe/observe.js":
/*!*******************************************!*\
  !*** ./build/src/core/observe/observe.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./build/src/core/observe/dep.js\");\n\r\nvar Observer = (function () {\r\n    function Observer(value) {\r\n        this.value = value;\r\n        if (Array.isArray(this.value)) {\r\n        }\r\n        else {\r\n            this.walk(value);\r\n        }\r\n    }\r\n    Observer.prototype.walk = function (obj) {\r\n        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {\r\n            var _b = _a[_i], val = _b[0], key = _b[1];\r\n            this.detect(obj, key, val);\r\n        }\r\n    };\r\n    Observer.prototype.detect = function (obj, key, val) {\r\n        if (typeof (val) == 'object') {\r\n            new Observer(val);\r\n        }\r\n        var dep = new _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        Object.defineProperty(obj, key, {\r\n            get: function () {\r\n                dep.depend();\r\n                return val;\r\n            },\r\n            set: function (newVal) {\r\n                if (val === newVal) {\r\n                    return;\r\n                }\r\n                val = newVal;\r\n                dep.notify();\r\n            }\r\n        });\r\n    };\r\n    return Observer;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observer);\r\n\n\n//# sourceURL=webpack://moush-vue/./build/src/core/observe/observe.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./build/index.js");
/******/ 	
/******/ })()
;