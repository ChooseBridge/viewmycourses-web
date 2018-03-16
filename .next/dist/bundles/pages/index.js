module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "react"
var external__react_ = __webpack_require__(0);
var external__react__default = /*#__PURE__*/__webpack_require__.n(external__react_);

// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(3);
var style__default = /*#__PURE__*/__webpack_require__.n(style_);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(4);
var head__default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./components/base/index.js




/* harmony default export */ var base = (function (_ref) {
  var children = _ref.children,
      title = _ref.title;
  return external__react__default.a.createElement(
    'div',
    {
      className: 'jsx-3261881544'
    },
    external__react__default.a.createElement(
      head__default.a,
      null,
      external__react__default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', className: 'jsx-3261881544'
      }),
      external__react__default.a.createElement('meta', { charSet: 'utf-8', className: 'jsx-3261881544'
      }),
      external__react__default.a.createElement(
        'title',
        {
          className: 'jsx-3261881544'
        },
        title
      ),
      external__react__default.a.createElement('link', { rel: 'stylesheet', href: 'https://unpkg.com/antd@3/dist/antd.min.css', className: 'jsx-3261881544'
      }),
      external__react__default.a.createElement('link', { rel: 'stylesheet', href: '/_next/static/style.css', className: 'jsx-3261881544'
      })
    ),
    external__react__default.a.createElement(style__default.a, {
      styleId: '3261881544',
      css: []
    }),
    children
  );
});
// EXTERNAL MODULE: external "antd"
var external__antd_ = __webpack_require__(5);
var external__antd__default = /*#__PURE__*/__webpack_require__.n(external__antd_);

// EXTERNAL MODULE: ./pages/style.css
var style = __webpack_require__(6);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./pages/index.js





var Header = external__antd_["Layout"].Header,
    Footer = external__antd_["Layout"].Footer,
    Content = external__antd_["Layout"].Content;


/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return external__react__default.a.createElement(
    base,
    { title: '\u9996\u9875' },
    external__react__default.a.createElement(
      external__antd_["Layout"],
      null,
      external__react__default.a.createElement(
        Header,
        { className: style_default.a.header },
        external__react__default.a.createElement(
          'h2',
          { className: style_default.a.logo },
          '\u6865\u9009\xAE\u6821\u56ED'
        ),
        external__react__default.a.createElement(
          external__antd_["Menu"],
          {
            theme: 'dark',
            mode: 'horizontal',
            defaultSelectedKeys: ['2'],
            className: style_default.a.menu
          },
          external__react__default.a.createElement(
            external__antd_["Menu"].Item,
            { key: '1' },
            '\u5173\u4E8E\u6211\u4EEC'
          ),
          external__react__default.a.createElement(
            external__antd_["Menu"].Item,
            { key: '2' },
            '\u67E5\u627E\u9AD8\u6821'
          ),
          external__react__default.a.createElement(
            external__antd_["Menu"].Item,
            { key: '3' },
            '\u67E5\u627E\u6559\u6388'
          ),
          external__react__default.a.createElement(
            external__antd_["Menu"].Item,
            { key: '4' },
            '\u6211\u8981\u70B9\u8BC4'
          )
        )
      ),
      external__react__default.a.createElement(
        Content,
        { style: { padding: '0 50px' } },
        external__react__default.a.createElement(
          external__antd_["Breadcrumb"],
          { style: { margin: '16px 0' } },
          external__react__default.a.createElement(
            external__antd_["Breadcrumb"].Item,
            null,
            'Home'
          ),
          external__react__default.a.createElement(
            external__antd_["Breadcrumb"].Item,
            null,
            'List'
          ),
          external__react__default.a.createElement(
            external__antd_["Breadcrumb"].Item,
            null,
            'App'
          )
        ),
        external__react__default.a.createElement(
          'div',
          { style: { background: '#fff', padding: 24, minHeight: 280 } },
          'Content'
        )
      ),
      external__react__default.a.createElement(
        Footer,
        { style: { textAlign: 'center' } },
        'Ant Design \xA92016 Created by Ant UED'
      )
    )
  );
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"logo": "F7DxZBqIJh01n5OjqDj1u",
	"header": "_31IlsxrHb85hqDHDFEfgSz",
	"menu": "_1lpD0uxzCCwYRuHVyUqGKL"
};

/***/ })
/******/ ]);