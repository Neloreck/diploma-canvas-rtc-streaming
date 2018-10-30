(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["module@stream"],{

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




/***/ }),

/***/ "./src/application/modules/stream/Module.tsx":
/*!***************************************************!*\
  !*** ./src/application/modules/stream/Module.tsx ***!
  \***************************************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lib_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/util/logger */ "./src/application/lib/util/logger/index.ts");
/* harmony import */ var _Module_stream_data_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Module/stream/data/store */ "./src/application/modules/stream/data/store/index.ts");
/* harmony import */ var _Module_stream_ModuleRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/ModuleRouter */ "./src/application/modules/stream/ModuleRouter.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let Module = class Module extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    componentDidMount() {
        _Lib_util_logger__WEBPACK_IMPORTED_MODULE_2__["log"].info("Module 'stream' has been mounted into DOM.");
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_ModuleRouter__WEBPACK_IMPORTED_MODULE_4__["ModuleRouter"], null);
    }
};
Module = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Wrapped"])(_Module_stream_data_store__WEBPACK_IMPORTED_MODULE_3__["StreamStoreProvider"])
], Module);



/***/ }),

/***/ "./src/application/modules/stream/ModuleRouter.tsx":
/*!*********************************************************!*\
  !*** ./src/application/modules/stream/ModuleRouter.tsx ***!
  \*********************************************************/
/*! exports provided: ModuleRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleRouter", function() { return ModuleRouter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/lazy_load */ "./src/application/lib/react_lib/lazy_load/index.ts");
/* harmony import */ var _Main_view_containers_pages_ErrorPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Main/view/containers/pages/ErrorPage */ "./src/application/modules/main/view/containers/pages/ErrorPage/index.ts");





/* Stream routes: */
const StreamConfigurationPage = _Lib_react_lib_lazy_load__WEBPACK_IMPORTED_MODULE_2__["lazyLoadComponentFactory"].getComponent(() => Promise.all(/*! import() | stream@stream-configuration-page */[__webpack_require__.e("vendors~stream@stream-configuration-page"), __webpack_require__.e("stream@stream-configuration-page")]).then(__webpack_require__.bind(null, /*! @Module/stream/view/containers/pages/StreamConfigurationPage */ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/index.ts")));
class ModuleRouter extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: `${ModuleRouter.MODULE_PREFIX}`, component: StreamConfigurationPage }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: `${ModuleRouter.MODULE_PREFIX}/test`, component: StreamConfigurationPage }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "*", component: _Main_view_containers_pages_ErrorPage__WEBPACK_IMPORTED_MODULE_3__["ErrorPage"] }))));
    }
}
ModuleRouter.MODULE_PREFIX = "/stream";


/***/ }),

/***/ "./src/application/modules/stream/data/store/StreamStoreManager.ts":
/*!*************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/StreamStoreManager.ts ***!
  \*************************************************************************/
/*! exports provided: StreamStoreManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamStoreManager", function() { return StreamStoreManager; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Main_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Main/config */ "./src/application/modules/main/config/index.ts");
/* harmony import */ var _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/data/store/graphics */ "./src/application/modules/stream/data/store/graphics/index.ts");
/* harmony import */ var _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Module/stream/data/store/source */ "./src/application/modules/stream/data/store/source/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let StreamStoreManager = class StreamStoreManager extends redux_cbd__WEBPACK_IMPORTED_MODULE_1__["CBDStoreManager"] {
    constructor() {
        super(...arguments);
        this.debug = _Main_config__WEBPACK_IMPORTED_MODULE_3__["appConfig"].isDev;
    }
    createStore() {
        const middlewares = [redux_cbd__WEBPACK_IMPORTED_MODULE_1__["cbdMiddleware"]];
        const composeEnhancers = this.debug ? Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__["composeWithDevTools"])({}) : (it) => it;
        return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(this.createRootReducer(), composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middlewares)));
    }
    createRootReducer() {
        return Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
            graphics: new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_4__["GraphicsReducer"]().asFunctional(new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_4__["GraphicsState"](), { freezeState: true }),
            source: new _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_5__["SourceReducer"]().asFunctional(new _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_5__["SourceState"](), { freezeState: true })
        });
    }
};
StreamStoreManager = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_1__["StoreManaged"])("STREAM_STORE")
], StreamStoreManager);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/GraphicsReducer.ts":
/*!*******************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/GraphicsReducer.ts ***!
  \*******************************************************************************/
/*! exports provided: GraphicsReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsReducer", function() { return GraphicsReducer; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/application/modules/stream/data/store/graphics/actions/index.ts");
/* harmony import */ var _GraphicsState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GraphicsState */ "./src/application/modules/stream/data/store/graphics/GraphicsState.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



class GraphicsReducer extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ReflectiveReducer"] {
    addGraphicsObject(state, action) {
        const objects = [
            new action.payload.object.prototype.constructor()
        ].concat(state.objects);
        return { ...state, objects };
    }
    handleToggleGrid(state, action) {
        return { ...state, showGrid: action.payload.show };
    }
    handleTogglePreviewMode(state, action) {
        return { ...state, showPreview: action.payload.show };
    }
    handleToggleGraphicsDisplay(state, action) {
        return { ...state, showGraphics: action.payload.show };
    }
    // Todo:
    removeGraphicsObject(state, action) {
        return { ...state, objects: [action.payload.object] };
    }
    changeGraphicsObject(state, action) {
        return { ...state, objects: [action.payload.object] };
    }
}
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["AddGraphicsObjectAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "addGraphicsObject", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["SetGridDisplayAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "handleToggleGrid", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["SetPreviewModeAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "handleTogglePreviewMode", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["SetGraphicsDisplayAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "handleToggleGraphicsDisplay", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["RemoveGraphicsObjectAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "removeGraphicsObject", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"], _actions__WEBPACK_IMPORTED_MODULE_1__["UpdateGraphicsObjectAction"]]),
    __metadata("design:returntype", _GraphicsState__WEBPACK_IMPORTED_MODULE_2__["GraphicsState"])
], GraphicsReducer.prototype, "changeGraphicsObject", null);


/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/GraphicsState.ts":
/*!*****************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/GraphicsState.ts ***!
  \*****************************************************************************/
/*! exports provided: GraphicsState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsState", function() { return GraphicsState; });
class GraphicsState {
    constructor() {
        this.objects = [];
        this.showGraphics = true;
        this.showGrid = false;
        this.showPreview = false;
    }
}


/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/AddGraphicsObjectAction.ts":
/*!***********************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/AddGraphicsObjectAction.ts ***!
  \***********************************************************************************************/
/*! exports provided: AddGraphicsObjectAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddGraphicsObjectAction", function() { return AddGraphicsObjectAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let AddGraphicsObjectAction = class AddGraphicsObjectAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
AddGraphicsObjectAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("ADD_GRAPHICS_OBJECT")
], AddGraphicsObjectAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/RemoveGraphicsObjectAction.ts":
/*!**************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/RemoveGraphicsObjectAction.ts ***!
  \**************************************************************************************************/
/*! exports provided: RemoveGraphicsObjectAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveGraphicsObjectAction", function() { return RemoveGraphicsObjectAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let RemoveGraphicsObjectAction = class RemoveGraphicsObjectAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
RemoveGraphicsObjectAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("REMOVE_GRAPHICS_OBJECT")
], RemoveGraphicsObjectAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/SetGraphicsDisplayAction.ts":
/*!************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/SetGraphicsDisplayAction.ts ***!
  \************************************************************************************************/
/*! exports provided: SetGraphicsDisplayAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetGraphicsDisplayAction", function() { return SetGraphicsDisplayAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SetGraphicsDisplayAction = class SetGraphicsDisplayAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
SetGraphicsDisplayAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("GRAPHICS_SET_GRAPHICS_DISPLAY")
], SetGraphicsDisplayAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/SetGridDisplayAction.ts":
/*!********************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/SetGridDisplayAction.ts ***!
  \********************************************************************************************/
/*! exports provided: SetGridDisplayAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetGridDisplayAction", function() { return SetGridDisplayAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SetGridDisplayAction = class SetGridDisplayAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
SetGridDisplayAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("GRAPHICS_SET_GRID_DISPLAY")
], SetGridDisplayAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/SetPreviewModeAction.ts":
/*!********************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/SetPreviewModeAction.ts ***!
  \********************************************************************************************/
/*! exports provided: SetPreviewModeAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetPreviewModeAction", function() { return SetPreviewModeAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SetPreviewModeAction = class SetPreviewModeAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
SetPreviewModeAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("GRAPHICS_SET_PREVIEW_MODE")
], SetPreviewModeAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/UpdateGraphicsObjectAction.ts":
/*!**************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/UpdateGraphicsObjectAction.ts ***!
  \**************************************************************************************************/
/*! exports provided: UpdateGraphicsObjectAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateGraphicsObjectAction", function() { return UpdateGraphicsObjectAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let UpdateGraphicsObjectAction = class UpdateGraphicsObjectAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
UpdateGraphicsObjectAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("UPDATE_GRAPHICS_OBJECT")
], UpdateGraphicsObjectAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/actions/index.ts":
/*!*****************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/actions/index.ts ***!
  \*****************************************************************************/
/*! exports provided: AddGraphicsObjectAction, UpdateGraphicsObjectAction, SetGridDisplayAction, RemoveGraphicsObjectAction, SetPreviewModeAction, SetGraphicsDisplayAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddGraphicsObjectAction */ "./src/application/modules/stream/data/store/graphics/actions/AddGraphicsObjectAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddGraphicsObjectAction", function() { return _AddGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_0__["AddGraphicsObjectAction"]; });

/* harmony import */ var _UpdateGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateGraphicsObjectAction */ "./src/application/modules/stream/data/store/graphics/actions/UpdateGraphicsObjectAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdateGraphicsObjectAction", function() { return _UpdateGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_1__["UpdateGraphicsObjectAction"]; });

/* harmony import */ var _SetGridDisplayAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SetGridDisplayAction */ "./src/application/modules/stream/data/store/graphics/actions/SetGridDisplayAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetGridDisplayAction", function() { return _SetGridDisplayAction__WEBPACK_IMPORTED_MODULE_2__["SetGridDisplayAction"]; });

/* harmony import */ var _RemoveGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RemoveGraphicsObjectAction */ "./src/application/modules/stream/data/store/graphics/actions/RemoveGraphicsObjectAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RemoveGraphicsObjectAction", function() { return _RemoveGraphicsObjectAction__WEBPACK_IMPORTED_MODULE_3__["RemoveGraphicsObjectAction"]; });

/* harmony import */ var _SetPreviewModeAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SetPreviewModeAction */ "./src/application/modules/stream/data/store/graphics/actions/SetPreviewModeAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetPreviewModeAction", function() { return _SetPreviewModeAction__WEBPACK_IMPORTED_MODULE_4__["SetPreviewModeAction"]; });

/* harmony import */ var _SetGraphicsDisplayAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SetGraphicsDisplayAction */ "./src/application/modules/stream/data/store/graphics/actions/SetGraphicsDisplayAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetGraphicsDisplayAction", function() { return _SetGraphicsDisplayAction__WEBPACK_IMPORTED_MODULE_5__["SetGraphicsDisplayAction"]; });









/***/ }),

/***/ "./src/application/modules/stream/data/store/graphics/index.ts":
/*!*********************************************************************!*\
  !*** ./src/application/modules/stream/data/store/graphics/index.ts ***!
  \*********************************************************************/
/*! exports provided: GraphicsState, GraphicsReducer, AddGraphicsObjectAction, UpdateGraphicsObjectAction, SetGridDisplayAction, RemoveGraphicsObjectAction, SetPreviewModeAction, SetGraphicsDisplayAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GraphicsState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphicsState */ "./src/application/modules/stream/data/store/graphics/GraphicsState.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphicsState", function() { return _GraphicsState__WEBPACK_IMPORTED_MODULE_0__["GraphicsState"]; });

/* harmony import */ var _GraphicsReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphicsReducer */ "./src/application/modules/stream/data/store/graphics/GraphicsReducer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphicsReducer", function() { return _GraphicsReducer__WEBPACK_IMPORTED_MODULE_1__["GraphicsReducer"]; });

/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/index */ "./src/application/modules/stream/data/store/graphics/actions/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddGraphicsObjectAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["AddGraphicsObjectAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdateGraphicsObjectAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["UpdateGraphicsObjectAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetGridDisplayAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["SetGridDisplayAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RemoveGraphicsObjectAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["RemoveGraphicsObjectAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetPreviewModeAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["SetPreviewModeAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetGraphicsDisplayAction", function() { return _actions_index__WEBPACK_IMPORTED_MODULE_2__["SetGraphicsDisplayAction"]; });






/***/ }),

/***/ "./src/application/modules/stream/data/store/index.ts":
/*!************************************************************!*\
  !*** ./src/application/modules/stream/data/store/index.ts ***!
  \************************************************************/
/*! exports provided: streamStoreManager, StreamStoreProvider, StreamStoreConnect, StreamStoreManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "streamStoreManager", function() { return streamStoreManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamStoreProvider", function() { return StreamStoreProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamStoreConnect", function() { return StreamStoreConnect; });
/* harmony import */ var _Module_stream_data_store_StreamStoreManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/data/store/StreamStoreManager */ "./src/application/modules/stream/data/store/StreamStoreManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StreamStoreManager", function() { return _Module_stream_data_store_StreamStoreManager__WEBPACK_IMPORTED_MODULE_0__["StreamStoreManager"]; });


const streamStoreManager = new _Module_stream_data_store_StreamStoreManager__WEBPACK_IMPORTED_MODULE_0__["StreamStoreManager"]();
const StreamStoreProvider = streamStoreManager.getProviderComponent();
const StreamStoreConnect = streamStoreManager.getConsumerAnnotation();



/***/ }),

/***/ "./src/application/modules/stream/data/store/source/SourceReducer.ts":
/*!***************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/SourceReducer.ts ***!
  \***************************************************************************/
/*! exports provided: SourceReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceReducer", function() { return SourceReducer; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/application/modules/stream/data/store/source/actions/index.ts");
/* harmony import */ var _SourceState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SourceState */ "./src/application/modules/stream/data/store/source/SourceState.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



class SourceReducer extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ReflectiveReducer"] {
    handleSelectedMediaDevicesChange(state, action) {
        const newState = { ...state };
        newState.selectedDevices = {
            audioInput: action.payload.audioInput,
            videoInput: action.payload.videoInput
        };
        return newState;
    }
    handleSourceStreamAndInputsChange(state, action) {
        return { ...state, inputStream: action.payload.stream, selectedDevices: action.payload.devices };
    }
}
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_SourceState__WEBPACK_IMPORTED_MODULE_2__["SourceState"], _actions__WEBPACK_IMPORTED_MODULE_1__["ChangeSelectedMediaDevicesAction"]]),
    __metadata("design:returntype", _SourceState__WEBPACK_IMPORTED_MODULE_2__["SourceState"])
], SourceReducer.prototype, "handleSelectedMediaDevicesChange", null);
__decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionHandler"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_SourceState__WEBPACK_IMPORTED_MODULE_2__["SourceState"], _actions__WEBPACK_IMPORTED_MODULE_1__["UpdateInputStreamAndSourcesAction"]]),
    __metadata("design:returntype", _SourceState__WEBPACK_IMPORTED_MODULE_2__["SourceState"])
], SourceReducer.prototype, "handleSourceStreamAndInputsChange", null);


/***/ }),

/***/ "./src/application/modules/stream/data/store/source/SourceState.ts":
/*!*************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/SourceState.ts ***!
  \*************************************************************************/
/*! exports provided: SourceState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceState", function() { return SourceState; });
class SourceState {
    constructor() {
        this.inputStream = null;
        this.outputStream = null;
        this.selectedDevices = {
            audioInput: null,
            videoInput: null
        };
    }
}


/***/ }),

/***/ "./src/application/modules/stream/data/store/source/actions/ChangeSelectedMediaDevicesAction.ts":
/*!******************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/actions/ChangeSelectedMediaDevicesAction.ts ***!
  \******************************************************************************************************/
/*! exports provided: ChangeSelectedMediaDevicesAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeSelectedMediaDevicesAction", function() { return ChangeSelectedMediaDevicesAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let ChangeSelectedMediaDevicesAction = class ChangeSelectedMediaDevicesAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
ChangeSelectedMediaDevicesAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("INPUT_SOURCE_CHANGE_MEDIA_DEVICES")
], ChangeSelectedMediaDevicesAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/source/actions/UpdateInputStreamAndSourcesAction.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/actions/UpdateInputStreamAndSourcesAction.ts ***!
  \*******************************************************************************************************/
/*! exports provided: UpdateInputStreamAndSourcesAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateInputStreamAndSourcesAction", function() { return UpdateInputStreamAndSourcesAction; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let UpdateInputStreamAndSourcesAction = class UpdateInputStreamAndSourcesAction extends redux_cbd__WEBPACK_IMPORTED_MODULE_0__["DataExchangeAction"] {
};
UpdateInputStreamAndSourcesAction = __decorate([
    Object(redux_cbd__WEBPACK_IMPORTED_MODULE_0__["ActionWired"])("SOURCE_UPDATE_INPUT_STREAM_AND_SOURCES")
], UpdateInputStreamAndSourcesAction);



/***/ }),

/***/ "./src/application/modules/stream/data/store/source/actions/index.ts":
/*!***************************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/actions/index.ts ***!
  \***************************************************************************/
/*! exports provided: ChangeSelectedMediaDevicesAction, UpdateInputStreamAndSourcesAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChangeSelectedMediaDevicesAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChangeSelectedMediaDevicesAction */ "./src/application/modules/stream/data/store/source/actions/ChangeSelectedMediaDevicesAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChangeSelectedMediaDevicesAction", function() { return _ChangeSelectedMediaDevicesAction__WEBPACK_IMPORTED_MODULE_0__["ChangeSelectedMediaDevicesAction"]; });

/* harmony import */ var _UpdateInputStreamAndSourcesAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateInputStreamAndSourcesAction */ "./src/application/modules/stream/data/store/source/actions/UpdateInputStreamAndSourcesAction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdateInputStreamAndSourcesAction", function() { return _UpdateInputStreamAndSourcesAction__WEBPACK_IMPORTED_MODULE_1__["UpdateInputStreamAndSourcesAction"]; });





/***/ }),

/***/ "./src/application/modules/stream/data/store/source/index.ts":
/*!*******************************************************************!*\
  !*** ./src/application/modules/stream/data/store/source/index.ts ***!
  \*******************************************************************/
/*! exports provided: SourceState, SourceReducer, ChangeSelectedMediaDevicesAction, UpdateInputStreamAndSourcesAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SourceState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceState */ "./src/application/modules/stream/data/store/source/SourceState.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SourceState", function() { return _SourceState__WEBPACK_IMPORTED_MODULE_0__["SourceState"]; });

/* harmony import */ var _SourceReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourceReducer */ "./src/application/modules/stream/data/store/source/SourceReducer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SourceReducer", function() { return _SourceReducer__WEBPACK_IMPORTED_MODULE_1__["SourceReducer"]; });

/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/application/modules/stream/data/store/source/actions/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChangeSelectedMediaDevicesAction", function() { return _actions__WEBPACK_IMPORTED_MODULE_2__["ChangeSelectedMediaDevicesAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdateInputStreamAndSourcesAction", function() { return _actions__WEBPACK_IMPORTED_MODULE_2__["UpdateInputStreamAndSourcesAction"]; });






/***/ }),

/***/ "./src/application/modules/stream/index.ts":
/*!*************************************************!*\
  !*** ./src/application/modules/stream/index.ts ***!
  \*************************************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Module_stream_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/Module */ "./src/application/modules/stream/Module.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return _Module_stream_Module__WEBPACK_IMPORTED_MODULE_0__["Module"]; });




/***/ })

}]);
//# sourceMappingURL=map/module@stream.bundle.map