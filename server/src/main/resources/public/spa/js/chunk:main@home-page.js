(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main@home-page"],{

/***/ "./src/application/modules/main/view/containers/pages/HomePage/HomePage.Component.tsx":
/*!********************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/HomePage/HomePage.Component.tsx ***!
  \********************************************************************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Main_data_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Main/data/store */ "./src/application/modules/main/data/store/index.ts");
/* harmony import */ var _Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Main/view/containers/elements/HeaderBar */ "./src/application/modules/main/view/containers/elements/HeaderBar/index.ts");
/* harmony import */ var _HomePage_Style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HomePage.Style */ "./src/application/modules/main/view/containers/pages/HomePage/HomePage.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let HomePage = class HomePage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { className: this.props.classes.root, container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_4__["HeaderBar"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: this.props.classes.content }, "Home page")));
    }
};
HomePage = __decorate([
    Object(_Main_data_store__WEBPACK_IMPORTED_MODULE_3__["GlobalStoreConnect"])((store) => ({
        authorizing: store.auth.authorizing
    }), {}),
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_HomePage_Style__WEBPACK_IMPORTED_MODULE_5__["homePageStyle"])
], HomePage);



/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/HomePage/HomePage.Style.ts":
/*!***************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/HomePage/HomePage.Style.ts ***!
  \***************************************************************************************/
/*! exports provided: homePageStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homePageStyle", function() { return homePageStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const homePageStyle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
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

/***/ "./src/application/modules/main/view/containers/pages/HomePage/index.ts":
/*!******************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/HomePage/index.ts ***!
  \******************************************************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HomePage_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomePage.Component */ "./src/application/modules/main/view/containers/pages/HomePage/HomePage.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return _HomePage_Component__WEBPACK_IMPORTED_MODULE_0__["HomePage"]; });




/***/ })

}]);
//# sourceMappingURL=map/main@home-page.bundle.map