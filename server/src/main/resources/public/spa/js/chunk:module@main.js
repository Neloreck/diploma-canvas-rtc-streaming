(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["module@main"],{

/***/ "./src/application/lib/react_lib/@material_ui/Styled.ts":
/*!**************************************************************!*\
  !*** ./src/application/lib/react_lib/@material_ui/Styled.ts ***!
  \**************************************************************/
/*! exports provided: Styled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Styled", function() { return Styled; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

function Styled(style, options) {
    return (target) => {
        return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(style, options)(target);
    };
}


/***/ }),

/***/ "./src/application/lib/react_lib/@material_ui/index.ts":
/*!*************************************************************!*\
  !*** ./src/application/lib/react_lib/@material_ui/index.ts ***!
  \*************************************************************/
/*! exports provided: Styled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lib_react_lib_material_ui_Styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Lib/react_lib/@material_ui/Styled */ "./src/application/lib/react_lib/@material_ui/Styled.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Styled", function() { return _Lib_react_lib_material_ui_Styled__WEBPACK_IMPORTED_MODULE_0__["Styled"]; });




/***/ }),

/***/ "./src/application/lib/util/logger/Logger.ts":
/*!***************************************************!*\
  !*** ./src/application/lib/util/logger/Logger.ts ***!
  \***************************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* tslint:disable: no-console */
class Logger {
    constructor(prefix) {
        this.prefix = prefix;
    }
    getPrefixed(prefix) {
        return new Logger(this.prefix + " " + prefix);
    }
    debug(...args) {
        if (Logger.isDev()) {
            console.debug(`%c${this.prefix}`, "color: #bada53", "[D]", ...args);
        }
    }
    warn(...args) {
        if (Logger.isDev()) {
            console.warn(`%c${this.prefix}`, "color: #bada53", ...args);
        }
    }
    error(...args) {
        console.error(`%c${this.prefix}`, "color: #bada53", ...args);
    }
    info(...args) {
        if (Logger.isDev()) {
            console.info(`%c${this.prefix}`, "color: #bada53", ...args);
        }
    }
}
Logger.isDev = () => "development" === "development";


/***/ }),

/***/ "./src/application/lib/util/logger/index.ts":
/*!**************************************************!*\
  !*** ./src/application/lib/util/logger/index.ts ***!
  \**************************************************/
/*! exports provided: log, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony import */ var _Lib_util_logger_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Lib/util/logger/Logger */ "./src/application/lib/util/logger/Logger.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _Lib_util_logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]; });


const log = new _Lib_util_logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]("[✴️‍️APP]");



/***/ }),

/***/ "./src/application/modules/main/Module.tsx":
/*!*************************************************!*\
  !*** ./src/application/modules/main/Module.tsx ***!
  \*************************************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lib_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Lib/util/logger */ "./src/application/lib/util/logger/index.ts");
/* harmony import */ var _Main_ModuleRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Main/ModuleRouter */ "./src/application/modules/main/ModuleRouter.tsx");




class Module extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    componentDidMount() {
        _Lib_util_logger__WEBPACK_IMPORTED_MODULE_1__["log"].info("Module 'main' has been mounted.");
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_ModuleRouter__WEBPACK_IMPORTED_MODULE_2__["ModuleRouter"], null);
    }
}


/***/ }),

/***/ "./src/application/modules/main/ModuleRouter.tsx":
/*!*******************************************************!*\
  !*** ./src/application/modules/main/ModuleRouter.tsx ***!
  \*******************************************************/
/*! exports provided: ModuleRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleRouter", function() { return ModuleRouter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Lib/react_lib/lazy_load */ "./src/application/lib/react_lib/lazy_load/index.ts");
/* harmony import */ var _Main_view_containers_pages_ErrorPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Main/view/containers/pages/ErrorPage */ "./src/application/modules/main/view/containers/pages/ErrorPage/index.ts");





/* Main routes: */

const HomePage = _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_3__["lazyLoadComponentFactory"].getComponent(() => __webpack_require__.e(/*! import() | main@home-page */ "main@home-page").then(__webpack_require__.bind(null, /*! modules/main/view/containers/pages/HomePage/index */ "./src/application/modules/main/view/containers/pages/HomePage/index.ts")));
const SignInPage = _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_3__["lazyLoadComponentFactory"].getComponent(() => __webpack_require__.e(/*! import() | main@sign-in-page */ "main@sign-in-page").then(__webpack_require__.bind(null, /*! modules/main/view/containers/pages/SignInPage/index */ "./src/application/modules/main/view/containers/pages/SignInPage/index.ts")));
const SignUpPage = _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_3__["lazyLoadComponentFactory"].getComponent(() => __webpack_require__.e(/*! import() | main@sign-up-page */ "main@sign-up-page").then(__webpack_require__.bind(null, /*! modules/main/view/containers/pages/SignUpPage/index */ "./src/application/modules/main/view/containers/pages/SignUpPage/index.ts")));
class ModuleRouter extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/", component: HomePage }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/home", component: HomePage }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/signIn", component: SignInPage }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/signUp", component: SignUpPage }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { component: _Main_view_containers_pages_ErrorPage__WEBPACK_IMPORTED_MODULE_4__["ErrorPage"] })));
    }
}


/***/ }),

/***/ "./src/application/modules/main/index.ts":
/*!***********************************************!*\
  !*** ./src/application/modules/main/index.ts ***!
  \***********************************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Main/Module */ "./src/application/modules/main/Module.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return _Main_Module__WEBPACK_IMPORTED_MODULE_0__["Module"]; });




/***/ }),

/***/ "./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Component.tsx":
/*!*************************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Component.tsx ***!
  \*************************************************************************************************/
/*! exports provided: HeaderBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderBar", function() { return HeaderBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _HeaderBar_Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeaderBar.Style */ "./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let HeaderBar = class HeaderBar extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["AppBar"], { className: classes.root, position: "static" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Toolbar"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], { className: classes.logo, variant: "h5", color: "inherit", noWrap: true }, "X-CORE"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { container: true, className: classes.rightBar },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: "contained", color: "default" }, "Placeholder"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: "contained", color: "default" }, "Placeholder")))));
    }
};
HeaderBar = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_HeaderBar_Style__WEBPACK_IMPORTED_MODULE_3__["headerBarStyle"])
], HeaderBar);



/***/ }),

/***/ "./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Style.ts":
/*!********************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Style.ts ***!
  \********************************************************************************************/
/*! exports provided: headerBarStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerBarStyle", function() { return headerBarStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const headerBarStyle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    logo: {
        minWidth: "100px"
    },
    rightBar: {
        flexGrow: 14,
        justifyContent: "flex-end"
    },
    root: {
        width: "100%"
    }
});


/***/ }),

/***/ "./src/application/modules/main/view/containers/elements/HeaderBar/index.ts":
/*!**********************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/elements/HeaderBar/index.ts ***!
  \**********************************************************************************/
/*! exports provided: HeaderBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HeaderBar_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderBar.Component */ "./src/application/modules/main/view/containers/elements/HeaderBar/HeaderBar.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBar", function() { return _HeaderBar_Component__WEBPACK_IMPORTED_MODULE_0__["HeaderBar"]; });




/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Component.tsx":
/*!**********************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Component.tsx ***!
  \**********************************************************************************************/
/*! exports provided: ErrorPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPage", function() { return ErrorPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Main_data_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Main/data/store */ "./src/application/modules/main/data/store/index.ts");
/* harmony import */ var _Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Main/view/containers/elements/HeaderBar */ "./src/application/modules/main/view/containers/elements/HeaderBar/index.ts");
/* harmony import */ var _ErrorPage_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorPage.Style */ "./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let ErrorPage = class ErrorPage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this.props.classes.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_3__["HeaderBar"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this.props.classes.content }, "This is error page...")));
    }
};
ErrorPage = __decorate([
    Object(_Main_data_store__WEBPACK_IMPORTED_MODULE_2__["GlobalStoreConnect"])((store) => ({}), {}),
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__["Styled"])(_ErrorPage_Style__WEBPACK_IMPORTED_MODULE_4__["errorPageStyle"])
], ErrorPage);



/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Style.ts":
/*!*****************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Style.ts ***!
  \*****************************************************************************************/
/*! exports provided: errorPageStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorPageStyle", function() { return errorPageStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const errorPageStyle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    content: {
        flexGrow: 24,
        width: "100%"
    },
    root: {
        height: "100%",
        width: "100%"
    }
});


/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/ErrorPage/index.ts":
/*!*******************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/ErrorPage/index.ts ***!
  \*******************************************************************************/
/*! exports provided: ErrorPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorPage_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorPage.Component */ "./src/application/modules/main/view/containers/pages/ErrorPage/ErrorPage.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorPage", function() { return _ErrorPage_Component__WEBPACK_IMPORTED_MODULE_0__["ErrorPage"]; });




/***/ })

}]);
//# sourceMappingURL=map/module@main.bundle.map