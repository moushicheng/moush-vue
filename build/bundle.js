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

/***/ "./config/declare.ts":
/*!***************************!*\
  !*** ./config/declare.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () { });\r\n\n\n//# sourceURL=webpack://moush-vue/./config/declare.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/core/observe/observe */ \"./src/core/observe/observe.ts\");\n/* harmony import */ var _src_core_complier_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/core/complier/index */ \"./src/core/complier/index.ts\");\n/* harmony import */ var _src_tool_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/tool/utils */ \"./src/tool/utils.ts\");\n/* harmony import */ var _src_core_init_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/core/init/helper */ \"./src/core/init/helper.ts\");\n/* harmony import */ var _config_declare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/declare */ \"./config/declare.ts\");\n\r\n\r\n\r\n\r\n\r\nvar moushVue = (function () {\r\n    function moushVue(options) {\r\n        this.$options = options;\r\n        this.init();\r\n        this.mounted();\r\n    }\r\n    moushVue.prototype.init = function () {\r\n        this.$options = (0,_src_tool_utils__WEBPACK_IMPORTED_MODULE_2__.mergeObj)(this.$options, {\r\n            beforeMount: function () { },\r\n            mounted: function () { },\r\n            watch: function () { },\r\n            method: function () { }\r\n        });\r\n        this.$data = this.$options.data;\r\n        this.$helper = _src_core_init_helper__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\n    };\r\n    moushVue.prototype.mounted = function () {\r\n        this.$options.beforeMount.call(this);\r\n        this.$el = document.querySelector(this.$options.el);\r\n        new _src_core_observe_observe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$data);\r\n        new _src_core_complier_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n        this.$options.mounted.call(this);\r\n    };\r\n    return moushVue;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moushVue);\r\nvar app = new moushVue({\r\n    el: \"#app\",\r\n    data: {\r\n        age: 1,\r\n        isShow: false\r\n    }\r\n});\r\nsetTimeout(function () {\r\n    app.$data.isShow = true;\r\n}, 1000);\r\n\n\n//# sourceURL=webpack://moush-vue/./index.ts?");

/***/ }),

/***/ "./src/core/complier/attrComplier.ts":
/*!*******************************************!*\
  !*** ./src/core/complier/attrComplier.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _observe_watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe/watcher */ \"./src/core/observe/watcher.ts\");\n\r\nvar commonAttr = {\r\n    \"v-if\": /^v-if/,\r\n    \"v-on\": /^v-on/,\r\n};\r\nvar attrComplier = (function () {\r\n    function attrComplier(node, vm) {\r\n        this.$vm = vm;\r\n        this.$node = node;\r\n        this.$attrs = this.formatAttrs(this.getAllVueAttrs(node));\r\n        this.handeler(this.$attrs);\r\n    }\r\n    attrComplier.prototype.getAllVueAttrs = function (node) {\r\n        var attrs = Array.from(node.attributes);\r\n        attrs = attrs.filter(function (attr) {\r\n            var res = false;\r\n            Object.values(commonAttr).map(function (attrExp) {\r\n                if (res == true)\r\n                    return;\r\n                res = attrExp.test(attr.name);\r\n            });\r\n            return res;\r\n        });\r\n        return attrs;\r\n    };\r\n    attrComplier.prototype.formatAttrs = function (attrs) {\r\n        var res = {};\r\n        for (var i = 0; i < attrs.length; i++) {\r\n            res[attrs[i].name] = {\r\n                name: attrs[i].name,\r\n                value: attrs[i].nodeValue,\r\n                run: \"handel\" + attrs[i].name.split(\"-\").join(\"\").toUpperCase(),\r\n            };\r\n        }\r\n        return res;\r\n    };\r\n    attrComplier.prototype.handeler = function (attrs) {\r\n        if (attrs == false)\r\n            return;\r\n        attrs = Object.entries(attrs);\r\n        for (var i = 0; i < attrs.length; i++) {\r\n            var attr = attrs[i][1];\r\n            var run = attr.run;\r\n            this[run](attrs[i][1]);\r\n        }\r\n    };\r\n    attrComplier.prototype.handelVIF = function (attr) {\r\n        var _this = this;\r\n        var key = attr.value;\r\n        var nodeCopy = this.$node.cloneNode(true);\r\n        var parentNode = this.$node.parentElement;\r\n        var isExist = true;\r\n        var w = new _observe_watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$vm, false, key, function (val, oldVal) {\r\n            if (val && isExist != true) {\r\n                parentNode.appendChild(nodeCopy);\r\n                _this.$vm.$helper.touch();\r\n            }\r\n            else {\r\n                isExist = false;\r\n                parentNode.removeChild(_this.$node);\r\n            }\r\n        });\r\n        w.update();\r\n    };\r\n    return attrComplier;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (attrComplier);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/complier/attrComplier.ts?");

/***/ }),

/***/ "./src/core/complier/index.ts":
/*!************************************!*\
  !*** ./src/core/complier/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _observe_watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe/watcher */ \"./src/core/observe/watcher.ts\");\n/* harmony import */ var _attrComplier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attrComplier */ \"./src/core/complier/attrComplier.ts\");\n\r\n\r\nvar Complier = (function () {\r\n    function Complier(vm) {\r\n        this.$vm = vm;\r\n        this.run(vm.$el);\r\n    }\r\n    Complier.prototype.run = function (node) {\r\n        var _this = this;\r\n        if (node.nodeType == 1) {\r\n            new _attrComplier__WEBPACK_IMPORTED_MODULE_1__[\"default\"](node, this.$vm);\r\n            node.childNodes.forEach(function (childNode) {\r\n                _this.run(childNode);\r\n            });\r\n        }\r\n        if (node.nodeType == 3) {\r\n            var reg = /{{(.+?)}}/g;\r\n            var match = void 0;\r\n            var _loop_1 = function () {\r\n                var raw = match[0];\r\n                var key = match[1].trim();\r\n                var text = node.nodeValue;\r\n                var w = new _observe_watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this_1.$vm, raw, key, function (val, oldVal) {\r\n                    while (text.match(raw)) {\r\n                        text = text.replace(raw, val);\r\n                    }\r\n                    node.nodeValue = text;\r\n                });\r\n                w.update();\r\n            };\r\n            var this_1 = this;\r\n            while (match = reg.exec(node.nodeValue)) {\r\n                _loop_1();\r\n            }\r\n        }\r\n    };\r\n    return Complier;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Complier);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/complier/index.ts?");

/***/ }),

/***/ "./src/core/init/helper.ts":
/*!*********************************!*\
  !*** ./src/core/init/helper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar helper = (function () {\r\n    function helper(vm) {\r\n        this.$vm = vm;\r\n    }\r\n    helper.prototype.touch = function () {\r\n        var data = this.$vm.$data;\r\n        if (!data)\r\n            return;\r\n        data = Object.entries(data);\r\n        data.forEach(function (val, key) {\r\n            var temp = val;\r\n        });\r\n    };\r\n    return helper;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (helper);\r\n\n\n//# sourceURL=webpack://moush-vue/./src/core/init/helper.ts?");

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

/***/ }),

/***/ "./src/tool/utils.ts":
/*!***************************!*\
  !*** ./src/tool/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mergeObj\": () => (/* binding */ mergeObj)\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nfunction mergeObj(obj1, obj2) {\r\n    return __assign(__assign({}, obj1), obj2);\r\n}\r\n\n\n//# sourceURL=webpack://moush-vue/./src/tool/utils.ts?");

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