(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main@sign-up-page"],{

/***/ "./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Component.tsx":
/*!********************************************************************************************************!*\
  !*** ./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Component.tsx ***!
  \********************************************************************************************************/
/*! exports provided: SignUpForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpForm", function() { return SignUpForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _SignUpForm_Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SignUpForm.Style */ "./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let SignUpForm = class SignUpForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = {
            loading: true
        };
    }
    render() {
        const classes = this.props.classes;
        const state = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Card"], { className: classes.root },
            state.loading
                ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["LinearProgress"], { color: "secondary", className: classes.linearLoader })
                : react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classes.linearLoader }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { className: classes.formWrapper, container: true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { label: "Login", className: classes.textInput, value: "", onChange: () => { }, margin: "normal" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { label: "Mail", className: classes.textInput, value: "", onChange: () => { }, margin: "normal" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { label: "Password", className: classes.textInput, value: "wetwet", onChange: () => { }, margin: "normal", type: "password" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { label: "Password repeat", className: classes.textInput, value: "wetwet", onChange: () => { }, margin: "normal", type: "password" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { justify: "flex-end", container: true },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { className: classes.signInButton, variant: "contained", color: "primary" }, "Submit")))));
    }
};
SignUpForm = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_SignUpForm_Style__WEBPACK_IMPORTED_MODULE_3__["signUpFormStyle"])
], SignUpForm);



/***/ }),

/***/ "./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Style.ts":
/*!***************************************************************************************************!*\
  !*** ./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Style.ts ***!
  \***************************************************************************************************/
/*! exports provided: signUpFormStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signUpFormStyle", function() { return signUpFormStyle; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

const signUpFormStyle = (theme) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    formWrapper: {
        padding: "1rem 2rem"
    },
    linearLoader: {
        backgroundColor: theme.palette.primary.light,
        height: 10,
    },
    root: {
        width: "350px"
    },
    signInButton: {
        marginTop: "4px"
    },
    textInput: {
        width: "100%"
    }
});


/***/ }),

/***/ "./src/application/modules/main/view/components/pages/signing/SignUpForm/index.ts":
/*!****************************************************************************************!*\
  !*** ./src/application/modules/main/view/components/pages/signing/SignUpForm/index.ts ***!
  \****************************************************************************************/
/*! exports provided: SignUpForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignUpForm_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignUpForm.Component */ "./src/application/modules/main/view/components/pages/signing/SignUpForm/SignUpForm.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SignUpForm", function() { return _SignUpForm_Component__WEBPACK_IMPORTED_MODULE_0__["SignUpForm"]; });




/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Component.tsx":
/*!************************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Component.tsx ***!
  \************************************************************************************************/
/*! exports provided: SignUpPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpPage", function() { return SignUpPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Main_data_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Main/data/store */ "./src/application/modules/main/data/store/index.ts");
/* harmony import */ var _Main_view_components_pages_signing_SignUpForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Main/view/components/pages/signing/SignUpForm */ "./src/application/modules/main/view/components/pages/signing/SignUpForm/index.ts");
/* harmony import */ var _Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Main/view/containers/elements/HeaderBar */ "./src/application/modules/main/view/containers/elements/HeaderBar/index.ts");
/* harmony import */ var _SignUpPage_Style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SignUpPage.Style */ "./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let SignUpPage = class SignUpPage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { className: this.props.classes.root, container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_5__["HeaderBar"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { container: true, justify: "center", alignItems: "center", className: this.props.classes.content },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_view_components_pages_signing_SignUpForm__WEBPACK_IMPORTED_MODULE_4__["SignUpForm"], Object.assign({}, {})))));
    }
};
SignUpPage = __decorate([
    Object(_Main_data_store__WEBPACK_IMPORTED_MODULE_3__["GlobalStoreConnect"])((store) => ({}), {}),
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_SignUpPage_Style__WEBPACK_IMPORTED_MODULE_6__["signUpPageStyle"])
], SignUpPage);



/***/ }),

/***/ "./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Style.ts":
/*!*******************************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Style.ts ***!
  \*******************************************************************************************/
/*! exports provided: signUpPageStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signUpPageStyle", function() { return signUpPageStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const signUpPageStyle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
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

/***/ "./src/application/modules/main/view/containers/pages/SignUpPage/index.ts":
/*!********************************************************************************!*\
  !*** ./src/application/modules/main/view/containers/pages/SignUpPage/index.ts ***!
  \********************************************************************************/
/*! exports provided: SignUpPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignUpPage_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignUpPage.Component */ "./src/application/modules/main/view/containers/pages/SignUpPage/SignUpPage.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SignUpPage", function() { return _SignUpPage_Component__WEBPACK_IMPORTED_MODULE_0__["SignUpPage"]; });




/***/ })

}]);
//# sourceMappingURL=map/main@sign-up-page.bundle.map