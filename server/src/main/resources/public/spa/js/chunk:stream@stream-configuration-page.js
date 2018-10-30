(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stream@stream-configuration-page"],{

/***/ "./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsPreprocessor.tsx":
/*!********************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsPreprocessor.tsx ***!
  \********************************************************************************************/
/*! exports provided: CanvasGraphicsPreprocessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsPreprocessor", function() { return CanvasGraphicsPreprocessor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CanvasGraphicsRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasGraphicsRenderer */ "./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsRenderer.tsx");
/* harmony import */ var _rendering_graphics_objects_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rendering/graphics_objects/index */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/index.ts");
/* harmony import */ var _rendering_graphics_objects_static_text_CenteredTextRO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rendering/graphics_objects/static/text/CenteredTextRO */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/text/CenteredTextRO.ts");






class CanvasGraphicsPreprocessor extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CanvasGraphicsRenderer__WEBPACK_IMPORTED_MODULE_1__["CanvasGraphicsRenderer"], { previewMode: this.props.showPreview, externalRenderingItems: this.getOutputRenderingObjectsContext(), internalRenderingItems: this.getPreviewRenderingObjectsContext() }));
    }
    getPreviewRenderingObjectsContext() {
        const previewItems = [];
        if (this.props.showGraphics === false) {
            return previewItems;
        }
        if (this.props.showGrid === true && this.props.showPreview === false) {
            previewItems.push(new _rendering_graphics_objects_index__WEBPACK_IMPORTED_MODULE_2__["GridLayoutRO"](1, 1));
        }
        return previewItems.concat(this.props.renderingObjects);
    }
    getOutputRenderingObjectsContext() {
        // Todo: Spinner instead of this.
        if (this.props.stream === null) {
            return [
                new _rendering_graphics_objects_static_text_CenteredTextRO__WEBPACK_IMPORTED_MODULE_3__["CenteredTextRO"]("Waiting for input stream.", 7, "#FFF")
            ];
        }
        if (this.props.stream.getVideoTracks().length === 0) {
            return [
                new _rendering_graphics_objects_static_text_CenteredTextRO__WEBPACK_IMPORTED_MODULE_3__["CenteredTextRO"]("Waiting for video.", 7, "#FFF")
            ];
        }
        // Passed 'error' conditions.
        const outputItems = [
            new _rendering_graphics_objects_index__WEBPACK_IMPORTED_MODULE_2__["DomVideoRO"](this.props.stream)
        ];
        if (this.props.showGraphics === true) {
            return outputItems.concat(this.props.renderingObjects);
        }
        return outputItems;
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsRenderer.tsx":
/*!****************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsRenderer.tsx ***!
  \****************************************************************************************/
/*! exports provided: CanvasGraphicsRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsRenderer", function() { return CanvasGraphicsRenderer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-resize-detector */ "./node_modules/react-resize-detector/lib/index.js");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_resize_detector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rendering/graphics_objects */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/index.ts");
/* harmony import */ var _rendering_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rendering/services */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






class CanvasGraphicsRenderer extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.internalPreRendererCanvas = Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
        this.externalPreRendererCanvas = Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
        this.composedRendererCanvas = Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
        this.internalRenderingService = new _rendering_services__WEBPACK_IMPORTED_MODULE_4__["RenderingService"]();
        this.externalRenderingService = new _rendering_services__WEBPACK_IMPORTED_MODULE_4__["RenderingService"]();
        this.composedRenderingService = new _rendering_services__WEBPACK_IMPORTED_MODULE_4__["RenderingService"]();
    }
    /* Lifecycle: */
    componentWillMount() {
        this.internalRenderingService.enableRendering();
        this.externalRenderingService.enableRendering();
        this.composedRenderingService.enableRendering();
    }
    componentDidMount() {
        const internalPreRendererCanvas = this.getInternalPreRenderer();
        const externalPreRendererCanvas = this.getExternalPreRenderer();
        const composedRendererCanvas = this.getComposedRenderer();
        this.internalRenderingService.setRenderContext(internalPreRendererCanvas.getContext("2d"));
        this.externalRenderingService.setRenderContext(externalPreRendererCanvas.getContext("2d"));
        this.composedRenderingService.setRenderContext(composedRendererCanvas.getContext("2d"));
        this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
        this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);
        this.composedRenderingService.setRenderObjects([
            new _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_3__["DomCanvasShadowRO"](externalPreRendererCanvas),
            new _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_3__["DomCanvasShadowRO"](internalPreRendererCanvas)
        ]);
        if (this.props.previewMode) {
            this.internalRenderingService.disableInteraction();
        }
        else {
            this.internalRenderingService.enableInteraction();
        }
        this.externalRenderingService.disableInteraction();
        this.externalRenderingService.disableContextCleanup();
        this.internalRenderingService.render();
        this.externalRenderingService.render();
        this.composedRenderingService.render();
    }
    componentDidUpdate() {
        if (this.props.previewMode) {
            this.internalRenderingService.disableInteraction();
        }
        else {
            this.internalRenderingService.enableInteraction();
        }
        this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
        this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);
    }
    componentWillUnmount() {
        this.internalRenderingService.disableRendering();
        this.externalRenderingService.disableRendering();
        this.composedRenderingService.disableRendering();
    }
    /* Stream getters for referal: */
    getInternalStream() {
        // @ts-ignore
        return this.getInternalPreRenderer().captureStream();
    }
    getExternalStream() {
        // @ts-ignore
        return this.getExternalPreRenderer().captureStream();
    }
    getComposedStream() {
        // @ts-ignore
        return this.getComposedRenderer().captureStream();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "canvas-renderer-layout", onMouseMove: this.handleLayoutMouseMove, onMouseEnter: this.handleLayoutMouseEnter, onMouseLeave: this.handleLayoutMouseLeave, onMouseDown: this.handleLayoutMouseDown, onMouseUp: this.handleLayoutMouseUp },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", { ref: this.internalPreRendererCanvas, className: "canvas-prerenderer-internal", hidden: true }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", { ref: this.externalPreRendererCanvas, className: "canvas-prerenderer-external", hidden: true }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", { ref: this.composedRendererCanvas, className: "canvas-renderer-composed" })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_resize_detector__WEBPACK_IMPORTED_MODULE_1___default.a, { onResize: (width, height) => this.reCalculateSizing(width, height), refreshMode: "throttle", refreshRate: 500, handleHeight: true, handleWidth: true })));
    }
    /* Getters for pre-renderer: */
    getInternalPreRenderer() {
        return this.internalPreRendererCanvas.current;
    }
    getExternalPreRenderer() {
        return this.externalPreRendererCanvas.current;
    }
    getComposedRenderer() {
        return this.composedRendererCanvas.current;
    }
    /* Events related methods: */
    handleLayoutMouseDown(event) {
        this.internalRenderingService.handleMouseDown(event);
    }
    handleLayoutMouseUp(event) {
        this.internalRenderingService.handleMouseUp(event);
    }
    handleLayoutMouseMove(event) {
        this.internalRenderingService.handleMouseMove(event);
    }
    handleLayoutMouseEnter(event) {
        this.internalRenderingService.handleMouseEnter(event);
    }
    handleLayoutMouseLeave(event) {
        this.internalRenderingService.handleMouseLeave(event);
    }
    /* Sizing related methods: */
    reCalculateSizing(width, height) {
        let canvasWidth = 0;
        let canvasHeight = 0;
        const aspectRatio = CanvasGraphicsRenderer.DEFAULT_ASPECT_RATIO;
        const maxHeight = width / aspectRatio;
        if (maxHeight <= height) {
            canvasHeight = maxHeight;
            canvasWidth = width;
        }
        else {
            canvasHeight = height;
            canvasWidth = height * aspectRatio;
        }
        this.resize(Math.floor(canvasWidth), Math.floor(canvasHeight));
    }
    resize(width, height) {
        // Update sizing for layouts.
        const internalPreRenderer = this.getInternalPreRenderer();
        const externalPreRenderer = this.getExternalPreRenderer();
        const composedRenderer = this.getComposedRenderer();
        internalPreRenderer.width = width;
        internalPreRenderer.height = height;
        externalPreRenderer.width = width;
        externalPreRenderer.height = height;
        composedRenderer.width = width;
        composedRenderer.height = height;
        // Update sizing context for renderer.
        const boundingRect = composedRenderer.getBoundingClientRect();
        const sizingContext = {
            height,
            offsetX: boundingRect.left,
            offsetY: boundingRect.top,
            width
        };
        this.internalRenderingService.setSizing(sizingContext);
        this.externalRenderingService.setSizing(sizingContext);
        this.composedRenderingService.setSizing(sizingContext);
    }
}
CanvasGraphicsRenderer.DEFAULT_ASPECT_RATIO = 16 / 9;
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_2__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasGraphicsRenderer.prototype, "handleLayoutMouseDown", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_2__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasGraphicsRenderer.prototype, "handleLayoutMouseUp", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_2__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasGraphicsRenderer.prototype, "handleLayoutMouseMove", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_2__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasGraphicsRenderer.prototype, "handleLayoutMouseEnter", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_2__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasGraphicsRenderer.prototype, "handleLayoutMouseLeave", null);


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/index.ts":
/*!**********************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/index.ts ***!
  \**********************************************************************/
/*! exports provided: CanvasGraphicsPreprocessor, CanvasGraphicsRenderObject, CanvasGraphicsInteractiveObject, CanvasGraphicsMovableObject, CanvasGraphicsMovableCircleObject, DomCanvasShadowRO, DomVideoRO, CenteredTextRO, GridLayoutRO, ResizeControl, AbstractMovableCircleObject, AbstractMovableRectangleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendering/graphics_objects */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsRenderObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsInteractiveObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsInteractiveObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableCircleObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableCircleObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomCanvasShadowRO", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["DomCanvasShadowRO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomVideoRO", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["DomVideoRO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CenteredTextRO", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["CenteredTextRO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridLayoutRO", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["GridLayoutRO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizeControl", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["ResizeControl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableCircleObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["AbstractMovableCircleObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableRectangleObject", function() { return _rendering_graphics_objects__WEBPACK_IMPORTED_MODULE_0__["AbstractMovableRectangleObject"]; });

/* harmony import */ var _CanvasGraphicsPreprocessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasGraphicsPreprocessor */ "./src/application/lib/react_lib/canvas_video_graphics/CanvasGraphicsPreprocessor.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsPreprocessor", function() { return _CanvasGraphicsPreprocessor__WEBPACK_IMPORTED_MODULE_1__["CanvasGraphicsPreprocessor"]; });





/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsInteractiveObject.ts":
/*!********************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsInteractiveObject.ts ***!
  \********************************************************************************************************************************/
/*! exports provided: CanvasGraphicsInteractiveObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsInteractiveObject", function() { return CanvasGraphicsInteractiveObject; });
/* harmony import */ var _CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");

class CanvasGraphicsInteractiveObject extends _CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"] {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
    isInteractive() {
        return true;
    }
    isSelected() {
        return this.selected;
    }
    setSelected(selected) {
        this.selected = selected;
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableCircleObject.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableCircleObject.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: CanvasGraphicsMovableCircleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableCircleObject", function() { return CanvasGraphicsMovableCircleObject; });
/* harmony import */ var _CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGraphicsMovableObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableObject.ts");

class CanvasGraphicsMovableCircleObject extends _CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableObject"] {
    isInBounds(target) {
        const { x: centerX, y: centerY } = this.getBoundsCenter();
        return Math.sqrt(Math.pow((target.x - centerX), 2) + Math.pow((target.y - centerY), 2)) < this.getBoundsRadius();
    }
    onMove(moveTo, moveFrom) {
        const center = this.getBoundsCenter();
        const newPosition = { x: 0, y: 0 };
        newPosition.x = center.x + (moveTo.x - moveFrom.x);
        newPosition.y = center.y + (moveTo.y - moveFrom.y);
        this.setBoundsCenter({ x: this.asPercentageWidth(newPosition.x), y: this.asPercentageHeight(newPosition.y) });
    }
    renderSelectionOverElement() {
        const context = this.getContext();
        const center = this.getBoundsCenter();
        const radius = this.getBoundsRadius() * 100 / this.getPercentageWidth(100);
        const { width: pWidth } = this.getPercentageBaseSizing();
        const piOffset = (Date.now() - this.createdAt) / 2000 * Math.PI;
        const segmentCount = 8;
        const segmentLengthOffset = 0.1 * Math.PI;
        context.strokeStyle = "#5dff71";
        context.fillStyle = "#5dff71";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(center.x, center.y, pWidth * 0.25, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        for (let it = 0; it < segmentCount; it++) {
            const offset = Math.PI * 2 / segmentCount * it;
            context.beginPath();
            context.arc(center.x, center.y, radius * pWidth + this.selectionPadding, offset + piOffset, offset + segmentLengthOffset + piOffset);
            context.stroke();
            context.closePath();
        }
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableObject.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableObject.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: CanvasGraphicsMovableObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableObject", function() { return CanvasGraphicsMovableObject; });
/* harmony import */ var _CanvasGraphicsResizableObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGraphicsResizableObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsResizableObject.ts");

class CanvasGraphicsMovableObject extends _CanvasGraphicsResizableObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsResizableObject"] {
    constructor() {
        super(...arguments);
        this.selectionPadding = 0;
    }
    afterMove(...args) { }
    isMovable() {
        return true;
    }
    move(moveTo, moveFrom) {
        this.onMove(moveTo, moveFrom);
        this.afterMove(moveTo, moveFrom);
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableRectangleObject.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableRectangleObject.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: CanvasGraphicsMovableRectangleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableRectangleObject", function() { return CanvasGraphicsMovableRectangleObject; });
/* harmony import */ var _CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGraphicsMovableObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableObject.ts");

class CanvasGraphicsMovableRectangleObject extends _CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableObject"] {
    isInBounds(target) {
        const { topLeft, topRight, botLeft, botRight } = this.getBoundingRect();
        const realPoint = { x: target.x, y: target.y };
        // Additional radius for moving / selection.
        topLeft.x -= this.selectionPadding;
        topLeft.y -= this.selectionPadding;
        topRight.x += this.selectionPadding;
        topRight.y -= this.selectionPadding;
        botLeft.x -= this.selectionPadding;
        botLeft.y += this.selectionPadding;
        botRight.x += this.selectionPadding;
        botRight.y += this.selectionPadding;
        // Check two triangles instead of rectangle.
        const isInFirstTriangle = this.checkPointInTriangle(realPoint, botLeft, topLeft, topRight);
        const isInSecondTriangle = this.checkPointInTriangle(realPoint, botLeft, botRight, topRight);
        return isInFirstTriangle || isInSecondTriangle;
    }
    checkTrianglesSign(p1, p2, p3) {
        return ((p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)) < 0;
    }
    checkPointInTriangle(pt, v1, v2, v3) {
        const b1 = this.checkTrianglesSign(pt, v1, v2);
        const b2 = this.checkTrianglesSign(pt, v2, v3);
        const b3 = this.checkTrianglesSign(pt, v3, v1);
        return ((b1 === b2) && (b2 === b3));
    }
    onMove(moveTo, moveFrom) {
        const boundingRect = this.getBoundingRect();
        const newPosition = { x: 0, y: 0 };
        newPosition.x = boundingRect.topLeft.x + (moveTo.x - moveFrom.x);
        newPosition.y = boundingRect.topLeft.y + (moveTo.y - moveFrom.y);
        this.setRoot(newPosition.x, newPosition.y);
    }
    renderSelectionOverElement() {
        const context = this.getContext();
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        const boundingRect = this.getBoundingRect();
        const halfWidth = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
        const halfHeight = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;
        const center = {
            x: (boundingRect.topRight.x - halfWidth),
            y: (boundingRect.botRight.y - halfHeight)
        };
        context.strokeStyle = "#5dff71";
        context.fillStyle = "#5dff71";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(center.x, center.y, pWidth * 0.2, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        // Over rect.
        boundingRect.topLeft.x -= this.selectionPadding;
        boundingRect.topLeft.y -= this.selectionPadding;
        boundingRect.topRight.x += this.selectionPadding;
        boundingRect.topRight.y -= this.selectionPadding;
        boundingRect.botRight.x += this.selectionPadding;
        boundingRect.botRight.y += this.selectionPadding;
        boundingRect.botLeft.x -= this.selectionPadding;
        boundingRect.botLeft.y += this.selectionPadding;
        this.renderAnimatedDashedLine(boundingRect.topLeft, boundingRect.topRight);
        this.renderAnimatedDashedLine(boundingRect.topRight, boundingRect.botRight);
        this.renderAnimatedDashedLine(boundingRect.botRight, boundingRect.botLeft);
        this.renderAnimatedDashedLine(boundingRect.botLeft, boundingRect.topLeft);
    }
    renderAnimatedDashedLine(p1, p2, count = 0) {
        const context = this.getContext();
        context.lineDashOffset = -((Date.now() - this.createdAt) % 2000) / 8;
        context.setLineDash([25, 25]);
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
        context.closePath();
        context.setLineDash([0]);
        context.lineDashOffset = 0;
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts ***!
  \***************************************************************************************************************************/
/*! exports provided: CanvasGraphicsRenderObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsRenderObject", function() { return CanvasGraphicsRenderObject; });
/* harmony import */ var _util_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/uuid */ "./src/application/lib/react_lib/canvas_video_graphics/util/uuid.ts");

class CanvasGraphicsRenderObject {
    constructor() {
        this.createdAt = Date.now();
        this.id = "0";
        this.disabled = false;
        this.context = null;
        this.sizing = null;
        this.id = Object(_util_uuid__WEBPACK_IMPORTED_MODULE_0__["generateUUID"])();
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setContext(context) {
        this.context = context;
    }
    setSizing(sizing) {
        this.sizing = sizing;
    }
    getContext() {
        return this.context;
    }
    getSizing() {
        return this.sizing;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
    }
    isDisabled() {
        return this.disabled;
    }
    isMovable() {
        return false;
    }
    isResizable() {
        return false;
    }
    isInteractive() {
        return false;
    }
    // Private implementation.
    getPercentageWidth(percents) {
        return this.sizing.width * percents / 100;
    }
    getPercentageHeight(percents) {
        return this.sizing.height * percents / 100;
    }
    asPercentageWidth(absolute) {
        return absolute * 100 / this.sizing.width;
    }
    asPercentageHeight(absolute) {
        return absolute * 100 / this.sizing.height;
    }
    getPercentageBaseSizing() {
        return { width: this.sizing.width / 100, height: this.sizing.height / 100 };
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsResizableObject.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsResizableObject.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: CanvasGraphicsResizableObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsResizableObject", function() { return CanvasGraphicsResizableObject; });
/* harmony import */ var _CanvasGraphicsInteractiveObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGraphicsInteractiveObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsInteractiveObject.ts");

class CanvasGraphicsResizableObject extends _CanvasGraphicsInteractiveObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsInteractiveObject"] {
    afterResize(...args) { }
    isResizable() {
        return true;
    }
    resize(resizeTo, resizeFrom) {
        this.onResize(resizeTo, resizeFrom);
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/index.ts":
/*!*************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/index.ts ***!
  \*************************************************************************************************/
/*! exports provided: CanvasGraphicsRenderObject, CanvasGraphicsInteractiveObject, CanvasGraphicsMovableObject, CanvasGraphicsMovableCircleObject, DomCanvasShadowRO, DomVideoRO, CenteredTextRO, GridLayoutRO, ResizeControl, AbstractMovableCircleObject, AbstractMovableRectangleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsRenderObject", function() { return _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"]; });

/* harmony import */ var _base_CanvasGraphicsInteractiveObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/CanvasGraphicsInteractiveObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsInteractiveObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsInteractiveObject", function() { return _base_CanvasGraphicsInteractiveObject__WEBPACK_IMPORTED_MODULE_1__["CanvasGraphicsInteractiveObject"]; });

/* harmony import */ var _base_CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/CanvasGraphicsMovableObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableObject", function() { return _base_CanvasGraphicsMovableObject__WEBPACK_IMPORTED_MODULE_2__["CanvasGraphicsMovableObject"]; });

/* harmony import */ var _base_CanvasGraphicsMovableCircleObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/CanvasGraphicsMovableCircleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableCircleObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasGraphicsMovableCircleObject", function() { return _base_CanvasGraphicsMovableCircleObject__WEBPACK_IMPORTED_MODULE_3__["CanvasGraphicsMovableCircleObject"]; });

/* harmony import */ var _static_dom_DomCanvasShadowRO__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static/dom/DomCanvasShadowRO */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomCanvasShadowRO.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomCanvasShadowRO", function() { return _static_dom_DomCanvasShadowRO__WEBPACK_IMPORTED_MODULE_4__["DomCanvasShadowRO"]; });

/* harmony import */ var _static_dom_DomVideoRO__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./static/dom/DomVideoRO */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomVideoRO.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomVideoRO", function() { return _static_dom_DomVideoRO__WEBPACK_IMPORTED_MODULE_5__["DomVideoRO"]; });

/* harmony import */ var _static_text_CenteredTextRO__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./static/text/CenteredTextRO */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/text/CenteredTextRO.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CenteredTextRO", function() { return _static_text_CenteredTextRO__WEBPACK_IMPORTED_MODULE_6__["CenteredTextRO"]; });

/* harmony import */ var _static_utils_GridLayoutRO__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./static/utils/GridLayoutRO */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/utils/GridLayoutRO.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridLayoutRO", function() { return _static_utils_GridLayoutRO__WEBPACK_IMPORTED_MODULE_7__["GridLayoutRO"]; });

/* harmony import */ var _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./movable/ResizeControl */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/ResizeControl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizeControl", function() { return _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_8__["ResizeControl"]; });

/* harmony import */ var _movable_AbstractMovableCircleObject__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./movable/AbstractMovableCircleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableCircleObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableCircleObject", function() { return _movable_AbstractMovableCircleObject__WEBPACK_IMPORTED_MODULE_9__["AbstractMovableCircleObject"]; });

/* harmony import */ var _movable_AbstractMovableRectangleObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./movable/AbstractMovableRectangleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableRectangleObject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableRectangleObject", function() { return _movable_AbstractMovableRectangleObject__WEBPACK_IMPORTED_MODULE_10__["AbstractMovableRectangleObject"]; });














/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableCircleObject.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableCircleObject.ts ***!
  \*******************************************************************************************************************************/
/*! exports provided: AbstractMovableCircleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableCircleObject", function() { return AbstractMovableCircleObject; });
/* harmony import */ var _base_CanvasGraphicsMovableCircleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/CanvasGraphicsMovableCircleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableCircleObject.ts");
/* harmony import */ var _ResizeControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResizeControl */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/ResizeControl.ts");


class AbstractMovableCircleObject extends _base_CanvasGraphicsMovableCircleObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableCircleObject"] {
    constructor(radius, center) {
        super();
        this.radius = 150;
        this.center = { x: 100, y: 100 };
        this.resizeControlsSize = 10;
        this.resizeControl = new _ResizeControl__WEBPACK_IMPORTED_MODULE_1__["ResizeControl"](0, 0, 15, 15);
        this.radius = radius || 10;
        this.center = center || { x: 50, y: 50 };
    }
    renderInteraction() {
        this.renderSelectionOverElement();
        this.renderResizeControls();
    }
    isInResizeBounds(target) {
        const distance = Math.sqrt(Math.pow(target.x - this.getPercentageWidth(this.center.x), 2) + Math.pow(target.y - this.getPercentageHeight(this.center.y), 2));
        const isResizingOverBorder = (this.selected && Math.abs(this.getPercentageWidth(this.radius) - distance) < 4);
        return (isResizingOverBorder || this.resizeControl.isInBounds(target));
    }
    onResize(resizeTo, resizeFrom) {
        const distance = Math.sqrt(Math.pow(resizeTo.x - this.getPercentageWidth(this.center.x), 2) + Math.pow(resizeTo.y - this.getPercentageHeight(this.center.y), 2));
        this.radius = this.asPercentageWidth(Math.max(this.resizeControlsSize + 2, distance));
    }
    getBoundsRadius() {
        return this.getPercentageWidth(this.radius);
    }
    setBoundsCenter(target) {
        this.center.x = target.x;
        this.center.y = target.y;
    }
    getBoundsCenter() {
        return { x: this.getPercentageWidth(this.center.x), y: this.getPercentageHeight(this.center.y) };
    }
    renderResizeControls() {
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        const resizeSize = this.resizeControlsSize;
        this.resizeControl.setContext(this.getContext());
        this.resizeControl.setSizing(this.getSizing());
        this.resizeControl.updateAbsoluteSizing((this.center.x) * pWidth - resizeSize / 2, (this.center.y * pHeight - this.radius * pWidth), resizeSize, resizeSize);
        this.resizeControl.renderSelf();
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableRectangleObject.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/AbstractMovableRectangleObject.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: AbstractMovableRectangleObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMovableRectangleObject", function() { return AbstractMovableRectangleObject; });
/* harmony import */ var _base_CanvasGraphicsMovableRectangleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/CanvasGraphicsMovableRectangleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableRectangleObject.ts");
/* harmony import */ var _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../movable/ResizeControl */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/ResizeControl.ts");


class AbstractMovableRectangleObject extends _base_CanvasGraphicsMovableRectangleObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableRectangleObject"] {
    constructor(leftParam, topParam, widthParam, heightParam) {
        super();
        this.left = 0;
        this.top = 0;
        this.width = 5;
        this.height = 5;
        this.resizeControlsSize = 15;
        this.resizeTopLeft = new _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_1__["ResizeControl"](0, 0, 15, 15);
        this.resizeTopRight = new _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_1__["ResizeControl"](0, 0, 15, 15);
        this.resizeBotLeft = new _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_1__["ResizeControl"](0, 0, 15, 15);
        this.resizeBotRight = new _movable_ResizeControl__WEBPACK_IMPORTED_MODULE_1__["ResizeControl"](0, 0, 15, 15);
        const left = leftParam || 40;
        const top = topParam || 40;
        const width = widthParam || 20;
        const height = heightParam || 20;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.resizeTopLeft.setOwner(this);
        this.resizeTopRight.setOwner(this);
        this.resizeBotLeft.setOwner(this);
        this.resizeBotRight.setOwner(this);
        this.resizeTopLeft.setCorner(1);
        this.resizeTopRight.setCorner(0);
        this.resizeBotLeft.setCorner(2);
        this.resizeBotRight.setCorner(3);
    }
    renderInteraction() {
        this.renderSelectionOverElement();
        this.renderResizeControls();
    }
    isInResizeBounds(target) {
        return this.resizeTopLeft.isInBounds(target) || this.resizeTopRight.isInBounds(target) ||
            this.resizeBotLeft.isInBounds(target) || this.resizeBotRight.isInBounds(target);
    }
    /* Change size or coordinate depending or corner: */
    afterResize(resizeControl, corner) {
        const bounds = this.getBoundingRect();
        let diffX = 0;
        let diffY = 0;
        switch (corner) {
            case 0:
                diffY = this.asPercentageHeight(resizeControl.absoluteTop - bounds.topRight.y);
                this.top += diffY;
                this.height -= diffY;
                this.width += this.asPercentageWidth(resizeControl.absoluteLeft + resizeControl.absoluteWidth - bounds.topLeft.x - this.getPercentageWidth(this.width));
                break;
            case 1:
                diffX = this.asPercentageWidth(resizeControl.absoluteLeft - bounds.topLeft.x);
                this.left += diffX;
                this.width -= diffX;
                diffY = this.asPercentageHeight(resizeControl.absoluteTop - bounds.topRight.y);
                this.top += diffY;
                this.height -= diffY;
                break;
            case 2:
                diffX = this.asPercentageWidth(resizeControl.absoluteLeft - bounds.topLeft.x);
                this.left += diffX;
                this.width -= diffX;
                this.height += this.asPercentageHeight(resizeControl.absoluteTop + resizeControl.absoluteHeight - bounds.topLeft.y - this.getPercentageHeight(this.height));
                break;
            case 3:
                this.width += this.asPercentageWidth(resizeControl.absoluteLeft + resizeControl.absoluteWidth - bounds.botLeft.x - this.getPercentageWidth(this.width));
                this.height += this.asPercentageHeight(resizeControl.absoluteTop + resizeControl.absoluteHeight - bounds.topLeft.y - this.getPercentageHeight(this.height));
                break;
            default:
                throw new Error("Unknown corner: " + corner);
        }
    }
    onResize(resizeTo, resizeFrom) {
        const boundingRect = this.getBoundingRect();
        const halfWidth = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
        const halfHeight = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;
        const center = {
            x: (boundingRect.topRight.x - halfWidth),
            y: (boundingRect.botRight.y - halfHeight)
        };
        if (resizeTo.x > center.x && resizeTo.y < center.y) {
            this.resizeTopRight.move(resizeTo, resizeFrom);
        }
        else if (resizeTo.x < center.x && resizeTo.y < center.y) {
            this.resizeTopLeft.move(resizeTo, resizeFrom);
        }
        else if (resizeTo.x < center.x && resizeTo.y > center.y) {
            this.resizeBotLeft.move(resizeTo, resizeFrom);
        }
        else {
            this.resizeBotRight.move(resizeTo, resizeFrom);
        }
    }
    setRoot(x, y) {
        this.left = x * 100 / this.getPercentageWidth(100);
        this.top = y * 100 / this.getPercentageHeight(100);
    }
    getBoundingRect() {
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        const topLeft = { x: this.left * pWidth, y: this.top * pHeight };
        const topRight = { x: this.left * pWidth + this.width * pWidth, y: this.top * pHeight };
        const botRight = { x: this.left * pWidth + this.width * pWidth, y: this.top * pHeight + this.height * pHeight };
        const botLeft = { x: this.left * pWidth, y: this.top * pHeight + this.height * pHeight };
        return { topLeft, topRight, botLeft, botRight };
    }
    renderResizeControls() {
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        const resizeSize = this.resizeControlsSize;
        const realHeight = this.height * pHeight;
        const realWidth = this.width * pWidth;
        this.resizeTopLeft.setContext(this.getContext());
        this.resizeTopRight.setContext(this.getContext());
        this.resizeBotLeft.setContext(this.getContext());
        this.resizeBotRight.setContext(this.getContext());
        this.resizeTopLeft.setSizing(this.getSizing());
        this.resizeTopRight.setSizing(this.getSizing());
        this.resizeBotLeft.setSizing(this.getSizing());
        this.resizeBotRight.setSizing(this.getSizing());
        this.resizeTopLeft.updateAbsoluteSizing(this.left * pWidth, this.top * pHeight, resizeSize, resizeSize);
        this.resizeTopRight.updateAbsoluteSizing(this.left * pWidth, this.top * pHeight + realHeight - resizeSize, resizeSize, resizeSize);
        this.resizeBotLeft.updateAbsoluteSizing(this.left * pWidth + realWidth - resizeSize, this.top * pHeight, resizeSize, resizeSize);
        this.resizeBotRight.updateAbsoluteSizing(this.left * pWidth + realWidth - resizeSize, this.top * pHeight + realHeight - resizeSize, resizeSize, resizeSize);
        this.resizeTopLeft.renderSelf();
        this.resizeTopRight.renderSelf();
        this.resizeBotLeft.renderSelf();
        this.resizeBotRight.renderSelf();
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/ResizeControl.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/ResizeControl.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: ResizeControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeControl", function() { return ResizeControl; });
/* harmony import */ var _base_CanvasGraphicsMovableRectangleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/CanvasGraphicsMovableRectangleObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsMovableRectangleObject.ts");

class ResizeControl extends _base_CanvasGraphicsMovableRectangleObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsMovableRectangleObject"] {
    constructor(absoluteLeft, absoluteTop, absoluteWidth, absoluteHeight) {
        super();
        this.owner = null;
        this.absoluteLeft = 0;
        this.absoluteTop = 0;
        this.absoluteWidth = 15;
        this.absoluteHeight = 15;
        this.selectionPadding = 0;
        this.corner = 0;
        this.absoluteLeft = absoluteLeft;
        this.absoluteTop = absoluteTop;
        this.absoluteWidth = absoluteWidth;
        this.absoluteHeight = absoluteHeight;
    }
    renderSelf() {
        this.renderElement();
    }
    renderInteraction() {
        // Do nothing there.
    }
    afterMove() {
        this.owner.afterResize(this, this.corner);
    }
    isInResizeBounds(target) { return false; }
    updateAbsoluteSizing(absoluteLeft, absoluteTop, absoluteWidth, absoluteHeight) {
        this.absoluteLeft = absoluteLeft;
        this.absoluteTop = absoluteTop;
        this.absoluteWidth = absoluteWidth;
        this.absoluteHeight = absoluteHeight;
    }
    setOwner(owner) {
        this.owner = owner;
    }
    setCorner(corner) {
        this.corner = corner;
    }
    onResize(resizeTo, resizeFrom) { }
    onMove(moveFrom, moveTo) {
        const boundingRect = this.getBoundingRect();
        const halfWidth = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
        const halfHeight = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;
        this.setRoot((moveFrom.x - halfWidth), (moveFrom.y - halfHeight));
    }
    setRoot(x, y) {
        this.absoluteLeft = x;
        this.absoluteTop = y;
    }
    getBoundingRect() {
        const topLeft = { x: this.absoluteLeft, y: this.absoluteTop };
        const topRight = { x: this.absoluteLeft + this.absoluteWidth, y: this.absoluteTop };
        const botRight = { x: this.absoluteLeft + this.absoluteWidth, y: this.absoluteTop + this.absoluteHeight };
        const botLeft = { x: this.absoluteLeft, y: this.absoluteTop + this.absoluteHeight };
        return { topLeft, topRight, botLeft, botRight };
    }
    renderElement() {
        const context = this.getContext();
        context.lineWidth = 2;
        context.beginPath();
        context.rect(this.absoluteLeft, this.absoluteTop, this.absoluteWidth, this.absoluteHeight);
        context.stroke();
        context.closePath();
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomCanvasShadowRO.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomCanvasShadowRO.ts ***!
  \************************************************************************************************************************/
/*! exports provided: DomCanvasShadowRO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomCanvasShadowRO", function() { return DomCanvasShadowRO; });
/* harmony import */ var _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");

class DomCanvasShadowRO extends _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"] {
    constructor(shadow) {
        super();
        this.shadow = shadow;
    }
    renderSelf() {
        this.getContext().drawImage(this.shadow, 0, 0);
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomVideoRO.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/dom/DomVideoRO.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: DomVideoRO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomVideoRO", function() { return DomVideoRO; });
/* harmony import */ var _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");

class DomVideoRO extends _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"] {
    constructor(mediaStream) {
        super();
        this.isVideoRendering = false;
        this.mediaStream = new MediaStream();
        this.hiddenVideoRenderer = document.createElement("video");
        this.mediaStream = mediaStream;
        this.hiddenVideoRenderer.srcObject = mediaStream;
        this.startVideo()
            .then();
    }
    renderSelf() {
        const context = this.getContext();
        const sizing = this.getSizing();
        this.hiddenVideoRenderer.width = sizing.width;
        this.hiddenVideoRenderer.height = sizing.height;
        context.drawImage(this.hiddenVideoRenderer, 0, 0, sizing.width, sizing.height);
    }
    async startVideo() {
        if (this.isVideoRendering === false) {
            await this.hiddenVideoRenderer.play();
            this.isVideoRendering = true;
        }
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/text/CenteredTextRO.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/text/CenteredTextRO.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: CenteredTextRO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CenteredTextRO", function() { return CenteredTextRO; });
/* harmony import */ var _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");

class CenteredTextRO extends _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"] {
    constructor(text, textSize, textColor = "#000") {
        super();
        this.increment = 0;
        this.text = "textLabel";
        this.textSize = 24;
        this.textColor = "#000";
        this.text = text;
        this.textSize = textSize;
        this.textColor = textColor;
    }
    renderSelf() {
        this.renderTextLabel();
    }
    renderTextLabel() {
        const context = this.getContext();
        let text = this.text;
        const percentageSizing = this.getPercentageBaseSizing();
        const textSize = percentageSizing.width * this.textSize;
        const textAlignSub = textSize * text.length / 4;
        context.strokeStyle = "#FF0000";
        context.fillStyle = "#FFF";
        context.font = `${textSize}px Comic Sans MS`;
        context.textBaseline = "middle";
        // context.textAlign = "center";
        if (this.increment > 40 && this.increment < 80) {
            text += ".";
        }
        else if (this.increment >= 80) {
            text += "..";
        }
        this.increment++;
        this.increment = this.increment % 120;
        context.fillText(text, Math.floor(percentageSizing.width * 50 - textAlignSub), Math.floor(percentageSizing.height * 50));
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/utils/GridLayoutRO.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/static/utils/GridLayoutRO.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: GridLayoutRO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridLayoutRO", function() { return GridLayoutRO; });
/* harmony import */ var _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/CanvasGraphicsRenderObject */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/graphics_objects/base/CanvasGraphicsRenderObject.ts");

class GridLayoutRO extends _base_CanvasGraphicsRenderObject__WEBPACK_IMPORTED_MODULE_0__["CanvasGraphicsRenderObject"] {
    constructor(verticalLinesCount = 1, horizontalLinesCount = 1) {
        super();
        this.lineWidth = 3;
        this.verticalLinesCount = 1;
        this.horizontalLinesCount = 1;
        this.verticalLinesCount = verticalLinesCount;
        this.horizontalLinesCount = horizontalLinesCount;
    }
    renderSelf() {
        const context = this.getContext();
        const { width, height } = this.getSizing();
        const endWidth = width - 1;
        const endHeight = height - 1;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = "#1a09ff";
        for (let it = 1; it <= width; it += Math.floor(endWidth / (this.verticalLinesCount + 1))) {
            this.renderLine(it, 0, it, height);
        }
        for (let it = 1; it <= height; it += Math.floor(endHeight / (this.horizontalLinesCount + 1))) {
            this.renderLine(1, it, width, it);
        }
    }
    renderLine(x1, y1, x2, y2) {
        const context = this.getContext();
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/AbstractRenderingService.ts":
/*!************************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/services/AbstractRenderingService.ts ***!
  \************************************************************************************************************/
/*! exports provided: AbstractRenderingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractRenderingService", function() { return AbstractRenderingService; });
class AbstractRenderingService {
}


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/RenderingService.ts":
/*!****************************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/services/RenderingService.ts ***!
  \****************************************************************************************************/
/*! exports provided: RenderingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingService", function() { return RenderingService; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractRenderingService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractRenderingService */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/AbstractRenderingService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


class RenderingService extends _AbstractRenderingService__WEBPACK_IMPORTED_MODULE_1__["AbstractRenderingService"] {
    constructor() {
        super(...arguments);
        this.shouldRender = false;
        this.shouldHandleInteraction = false;
        this.shouldCleanupConext = true;
        this.renderContext = null;
        this.renderObjects = [];
        this.renderSizing = { width: 160, height: 90, offsetX: 0, offsetY: 0 };
        this.isMouseDown = false;
        this.isResizing = null;
        this.mouseTouchCoordinates = { x: 0, y: 0 };
        this.selectedObject = null;
    }
    /* Setters: */
    setMouseDown(isMouseDown, mouseTouch = null) {
        this.isMouseDown = isMouseDown;
        this.mouseTouchCoordinates = mouseTouch;
    }
    setMouseTouch(mouseTouch) {
        this.mouseTouchCoordinates = mouseTouch;
    }
    setSizing(sizing) {
        this.renderSizing = sizing;
    }
    setResizing(isResizing) {
        this.isResizing = isResizing;
    }
    setRenderContext(context) {
        this.renderContext = context;
    }
    setRenderObjects(objects) {
        this.renderObjects = objects;
    }
    enableRendering() {
        this.shouldRender = true;
    }
    disableRendering() {
        this.shouldRender = false;
    }
    enableInteraction() {
        this.shouldHandleInteraction = true;
    }
    disableInteraction() {
        this.shouldHandleInteraction = false;
    }
    disableContextCleanup() {
        this.shouldCleanupConext = false;
    }
    /* Events: */
    handleMouseDown(event) {
        if (!this.shouldHandleInteraction) {
            return;
        }
        this.setMouseDown(true, { x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY });
        // Remove selection.
        this.selectedObject = null;
        this.renderObjects.forEach((it) => {
            if (it.isInteractive()) {
                it.setSelected(false);
            }
        });
        // Add selection.
        for (let it = this.renderObjects.length - 1; it >= 0; it--) {
            const renderObject = this.renderObjects[it];
            if (renderObject.isMovable()) {
                const movableRenderObject = renderObject;
                if (movableRenderObject.isInBounds({ x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY })) {
                    movableRenderObject.setSelected(true);
                    this.selectedObject = movableRenderObject;
                    break;
                }
            }
        }
    }
    handleMouseUp(event) {
        if (this.shouldHandleInteraction) {
            this.setResizing(null);
            this.setMouseDown(false);
        }
    }
    handleMouseMove(event) {
        if (this.shouldHandleInteraction && this.isMouseDown) {
            const realPosition = { x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY };
            const oldPosition = this.mouseTouchCoordinates || realPosition;
            if (this.selectedObject !== null) {
                const isInResizeBounds = this.selectedObject.isInResizeBounds(realPosition);
                if (this.isResizing === null) {
                    this.setResizing(isInResizeBounds);
                }
                if (this.isResizing === true) {
                    this.selectedObject.resize(realPosition, oldPosition);
                }
                else {
                    this.selectedObject.move(realPosition, oldPosition);
                }
                this.setMouseTouch(realPosition);
            }
        }
    }
    handleMouseEnter(event) {
        if (this.shouldHandleInteraction) {
            this.setResizing(null);
            this.setMouseDown(false);
        }
    }
    handleMouseLeave(event) {
        if (this.shouldHandleInteraction) {
            this.setResizing(null);
            this.setMouseDown(false);
        }
    }
    /* Rendering: */
    render() {
        if (this.shouldCleanupConext) {
            this.clear();
        }
        if (this.shouldRender) {
            this.renderItems();
            window.requestAnimationFrame(this.render);
        }
    }
    clear() {
        this.renderContext.clearRect(0, 0, this.renderSizing.width, this.renderSizing.height);
    }
    renderItems() {
        for (const object of this.renderObjects) {
            object.setContext(this.renderContext);
            object.setSizing(this.renderSizing);
            if (!object.isDisabled()) {
                object.renderSelf();
                if (this.shouldHandleInteraction &&
                    object.isInteractive() && object.isSelected()) {
                    object.renderInteraction();
                }
            }
        }
    }
}
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_0__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RenderingService.prototype, "render", null);


/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/index.ts":
/*!*****************************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/rendering/services/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: AbstractRenderingService, RenderingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AbstractRenderingService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractRenderingService */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/AbstractRenderingService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractRenderingService", function() { return _AbstractRenderingService__WEBPACK_IMPORTED_MODULE_0__["AbstractRenderingService"]; });

/* harmony import */ var _RenderingService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RenderingService */ "./src/application/lib/react_lib/canvas_video_graphics/rendering/services/RenderingService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderingService", function() { return _RenderingService__WEBPACK_IMPORTED_MODULE_1__["RenderingService"]; });





/***/ }),

/***/ "./src/application/lib/react_lib/canvas_video_graphics/util/uuid.ts":
/*!**************************************************************************!*\
  !*** ./src/application/lib/react_lib/canvas_video_graphics/util/uuid.ts ***!
  \**************************************************************************/
/*! exports provided: generateUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
function generateUUID(placeholder) {
    return placeholder
        ? (placeholder ^ Math.random() * 16 >> placeholder / 4).toString(16)
        : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUID);
}


/***/ }),

/***/ "./src/application/modules/stream/data/services/local_media/EDeviceKind.ts":
/*!*********************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/local_media/EDeviceKind.ts ***!
  \*********************************************************************************/
/*! exports provided: EDeviceKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDeviceKind", function() { return EDeviceKind; });
var EDeviceKind;
(function (EDeviceKind) {
    EDeviceKind["AUDIO_OUTPUT"] = "audiooutput";
    EDeviceKind["AUDIO_INPUT"] = "audioinput";
    EDeviceKind["VIDEO_INPUT"] = "videoinput";
})(EDeviceKind || (EDeviceKind = {}));


/***/ }),

/***/ "./src/application/modules/stream/data/services/local_media/LocalMediaService.ts":
/*!***************************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/local_media/LocalMediaService.ts ***!
  \***************************************************************************************/
/*! exports provided: LocalMediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalMediaService", function() { return LocalMediaService; });
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lib_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Lib/util/logger */ "./src/application/lib/util/logger/index.ts");
/* harmony import */ var _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Module/stream/data/services/local_media/EDeviceKind */ "./src/application/modules/stream/data/services/local_media/EDeviceKind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocalMediaService_1;



let LocalMediaService = LocalMediaService_1 = class LocalMediaService {
    constructor() {
        this.log = new _Lib_util_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"]("[🕳️LMS]");
    }
    async getDevices() {
        return await navigator.mediaDevices.enumerateDevices();
    }
    async getAudioInputs() {
        return (await this.getDevices()).filter((device) => device.kind === _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__["EDeviceKind"].AUDIO_INPUT);
    }
    async getAudioOutputs() {
        return (await this.getDevices()).filter((device) => device.kind === _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__["EDeviceKind"].AUDIO_OUTPUT);
    }
    async getVideoInputs() {
        return (await this.getDevices()).filter((device) => device.kind === _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__["EDeviceKind"].VIDEO_INPUT);
    }
    async getInputDevicesBundled() {
        const devices = await this.getDevices();
        return {
            audio: devices.filter((device) => device.kind === _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__["EDeviceKind"].AUDIO_INPUT),
            video: devices.filter((device) => device.kind === _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_2__["EDeviceKind"].VIDEO_INPUT)
        };
    }
    killStream(stream) {
        if (stream === null) {
            return;
        }
        if (typeof stream.getTracks === "function") {
            stream.getTracks().forEach((track) => track.stop());
            return;
        }
        if (typeof stream.getAudioTracks === "function" && typeof stream.getVideoTracks === "function") {
            stream.getAudioTracks().forEach((track) => track.stop());
            stream.getVideoTracks().forEach((track) => track.stop());
            return;
        }
        if (typeof stream.stop === "function") {
            stream.stop();
        }
    }
    async getUserMedia(videoInput, audioInput) {
        const constraints = {
            audio: { deviceId: audioInput ? { exact: audioInput.deviceId } : undefined },
            video: {
                ...LocalMediaService_1.DEFAULT_VIDEO_CONSTRAINTS,
                deviceId: videoInput ? { exact: videoInput.deviceId } : undefined
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.log.info("Got media stream from devices:", constraints, stream);
        return stream;
    }
};
LocalMediaService.DEFAULT_VIDEO_CONSTRAINTS = {
    advanced: [
        { aspectRatio: { min: 1.7777, ideal: 1.7777, max: 1.7778 } }
    ],
    frameRate: { min: 27, ideal: 30, max: 60 },
    height: { min: 720, ideal: 720, max: 1080 },
};
LocalMediaService = LocalMediaService_1 = __decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_0__["Single"]
], LocalMediaService);



/***/ }),

/***/ "./src/application/modules/stream/data/services/local_media/index.ts":
/*!***************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/local_media/index.ts ***!
  \***************************************************************************/
/*! exports provided: localMediaService, LocalMediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localMediaService", function() { return localMediaService; });
/* harmony import */ var _Module_stream_data_services_local_media_LocalMediaService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/data/services/local_media/LocalMediaService */ "./src/application/modules/stream/data/services/local_media/LocalMediaService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalMediaService", function() { return _Module_stream_data_services_local_media_LocalMediaService__WEBPACK_IMPORTED_MODULE_0__["LocalMediaService"]; });


const localMediaService = new _Module_stream_data_services_local_media_LocalMediaService__WEBPACK_IMPORTED_MODULE_0__["LocalMediaService"]();



/***/ }),

/***/ "./src/application/modules/stream/data/services/rendering/RenderingService.ts":
/*!************************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/rendering/RenderingService.ts ***!
  \************************************************************************************/
/*! exports provided: RenderingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingService", function() { return RenderingService; });
/* harmony import */ var _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/data/services/rendering/canvas_objects */ "./src/application/modules/stream/data/services/rendering/canvas_objects/index.ts");

class RenderingService {
    static getRenderingDescriptors() {
        return this.RENDER_DESCRIPTORS;
    }
}
RenderingService.RENDER_DESCRIPTORS = [
    {
        description: "Simple rectangle",
        name: "Rectangle",
        prototype: _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__["SimpleRectangle"].prototype
    }, {
        description: "Simple circle",
        name: "Circle",
        prototype: _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__["SimpleCircle"].prototype
    }
];


/***/ }),

/***/ "./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleCircle.ts":
/*!***********************************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleCircle.ts ***!
  \***********************************************************************************************/
/*! exports provided: SimpleCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleCircle", function() { return SimpleCircle; });
/* harmony import */ var _Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Lib/react_lib/canvas_video_graphics */ "./src/application/lib/react_lib/canvas_video_graphics/index.ts");

class SimpleCircle extends _Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_0__["AbstractMovableCircleObject"] {
    renderSelf() {
        const context = this.getContext();
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        context.strokeStyle = "#ff0033";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.center.x * pWidth, this.center.y * pHeight, this.radius * pWidth, 0, 2 * Math.PI);
        context.stroke();
    }
}


/***/ }),

/***/ "./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleRectangle.ts":
/*!**************************************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleRectangle.ts ***!
  \**************************************************************************************************/
/*! exports provided: SimpleRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleRectangle", function() { return SimpleRectangle; });
/* harmony import */ var _Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Lib/react_lib/canvas_video_graphics */ "./src/application/lib/react_lib/canvas_video_graphics/index.ts");

class SimpleRectangle extends _Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_0__["AbstractMovableRectangleObject"] {
    renderSelf() {
        const context = this.getContext();
        const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
        context.strokeStyle = "#ff6664";
        context.lineWidth = 3;
        context.beginPath();
        context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
        context.stroke();
        context.closePath();
    }
}


/***/ }),

/***/ "./src/application/modules/stream/data/services/rendering/canvas_objects/index.ts":
/*!****************************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/rendering/canvas_objects/index.ts ***!
  \****************************************************************************************/
/*! exports provided: SimpleCircle, SimpleRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Module_stream_data_services_rendering_canvas_objects_SimpleCircle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/data/services/rendering/canvas_objects/SimpleCircle */ "./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleCircle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCircle", function() { return _Module_stream_data_services_rendering_canvas_objects_SimpleCircle__WEBPACK_IMPORTED_MODULE_0__["SimpleCircle"]; });

/* harmony import */ var _Module_stream_data_services_rendering_canvas_objects_SimpleRectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Module/stream/data/services/rendering/canvas_objects/SimpleRectangle */ "./src/application/modules/stream/data/services/rendering/canvas_objects/SimpleRectangle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleRectangle", function() { return _Module_stream_data_services_rendering_canvas_objects_SimpleRectangle__WEBPACK_IMPORTED_MODULE_1__["SimpleRectangle"]; });





/***/ }),

/***/ "./src/application/modules/stream/data/services/rendering/index.ts":
/*!*************************************************************************!*\
  !*** ./src/application/modules/stream/data/services/rendering/index.ts ***!
  \*************************************************************************/
/*! exports provided: RenderingService, SimpleCircle, SimpleRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Module/stream/data/services/rendering/canvas_objects */ "./src/application/modules/stream/data/services/rendering/canvas_objects/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCircle", function() { return _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__["SimpleCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleRectangle", function() { return _Module_stream_data_services_rendering_canvas_objects__WEBPACK_IMPORTED_MODULE_0__["SimpleRectangle"]; });

/* harmony import */ var _Module_stream_data_services_rendering_RenderingService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Module/stream/data/services/rendering/RenderingService */ "./src/application/modules/stream/data/services/rendering/RenderingService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderingService", function() { return _Module_stream_data_services_rendering_RenderingService__WEBPACK_IMPORTED_MODULE_1__["RenderingService"]; });





/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Component.tsx":
/*!*************************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Component.tsx ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: CanvasObjectsAdditionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasObjectsAdditionList", function() { return CanvasObjectsAdditionList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Module_stream_data_services_rendering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Module/stream/data/services/rendering */ "./src/application/modules/stream/data/services/rendering/index.ts");
/* harmony import */ var _CanvasObjectsAdditionList_Style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CanvasObjectsAdditionList.Style */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let CanvasObjectsAdditionList = class CanvasObjectsAdditionList extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], { className: classes.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["List"], null, _Module_stream_data_services_rendering__WEBPACK_IMPORTED_MODULE_5__["RenderingService"].getRenderingDescriptors().map(this.renderCanvasItem))));
    }
    renderCanvasItem(descriptor) {
        const { classes, onObjectAdded } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItem"], { key: "RI-" + descriptor.prototype.constructor.name, className: classes.descriptionItem },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItemText"], { primary: descriptor.name }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItemSecondaryAction"], { className: classes.descriptorItemSecondary },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { "aria-label": "Add", onClick: () => onObjectAdded(descriptor) },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_3__["Add"], null)))));
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], CanvasObjectsAdditionList.prototype, "renderCanvasItem", null);
CanvasObjectsAdditionList = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_4__["Styled"])(_CanvasObjectsAdditionList_Style__WEBPACK_IMPORTED_MODULE_6__["canvasObjectsAdditionListStyle"])
], CanvasObjectsAdditionList);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Style.ts":
/*!********************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Style.ts ***!
  \********************************************************************************************************************************************************/
/*! exports provided: canvasObjectsAdditionListStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasObjectsAdditionListStyle", function() { return canvasObjectsAdditionListStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const canvasObjectsAdditionListStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    descriptionItem: {},
    descriptorItemSecondary: {},
    root: {
        backgroundColor: theme.palette.primary.light,
        flexGrow: 1,
        margin: `0 ${theme.spacing.unit * 4}px`,
        minWidth: "300px"
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/index.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/index.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: CanvasObjectsAdditionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasObjectsAdditionList_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasObjectsAdditionList.Component */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/CanvasObjectsAdditionList.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasObjectsAdditionList", function() { return _CanvasObjectsAdditionList_Component__WEBPACK_IMPORTED_MODULE_0__["CanvasObjectsAdditionList"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Component.tsx":
/*!*************************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Component.tsx ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: PreviewConfigurationBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewConfigurationBlock", function() { return PreviewConfigurationBlock; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _PreviewConfigurationBlock_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PreviewConfigurationBlock.Style */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let PreviewConfigurationBlock = class PreviewConfigurationBlock extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        const { classes, showGrid, showPreview, showGraphics } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Grid"], { className: classes.root, direction: "column", container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { component: "legend" }, "Preview configuration"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormControlLabel"], { label: "Preview mode", control: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Switch"], { checked: showPreview, onChange: this.onPreviewToggle }) }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormControlLabel"], { label: "Show graphics", control: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Switch"], { checked: showGraphics, onChange: this.onGraphicsToggle }) }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormControlLabel"], { label: "Show Grid", control: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Switch"], { checked: showGrid, onChange: this.onGridToggle }) })));
    }
    onPreviewToggle(event) {
        this.props.onPreviewToggle(event.target.checked);
    }
    onGraphicsToggle(event) {
        this.props.onGraphicsToggle(event.target.checked);
    }
    onGridToggle(event) {
        this.props.onGridToggle(event.target.checked);
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreviewConfigurationBlock.prototype, "onPreviewToggle", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreviewConfigurationBlock.prototype, "onGraphicsToggle", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreviewConfigurationBlock.prototype, "onGridToggle", null);
PreviewConfigurationBlock = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_PreviewConfigurationBlock_Style__WEBPACK_IMPORTED_MODULE_4__["previewConfigurationBlockStyle"])
], PreviewConfigurationBlock);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Style.ts":
/*!********************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Style.ts ***!
  \********************************************************************************************************************************************************/
/*! exports provided: previewConfigurationBlockStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "previewConfigurationBlockStyle", function() { return previewConfigurationBlockStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const previewConfigurationBlockStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    root: {
        backgroundColor: theme.palette.primary.main,
        border: "2px black solid",
        padding: theme.spacing.unit + "px"
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/index.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/index.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: PreviewConfigurationBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PreviewConfigurationBlock_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreviewConfigurationBlock.Component */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/PreviewConfigurationBlock.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewConfigurationBlock", function() { return _PreviewConfigurationBlock_Component__WEBPACK_IMPORTED_MODULE_0__["PreviewConfigurationBlock"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Component.tsx":
/*!***************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Component.tsx ***!
  \***************************************************************************************************************************************************/
/*! exports provided: StreamingHelpManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamingHelpManager", function() { return StreamingHelpManager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/index.es.js");
/* harmony import */ var _StreamingHelpManager_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StreamingHelpManager.Style */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let StreamingHelpManager = class StreamingHelpManager extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        const { classes, } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], { className: classes.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: "Search for help.", placement: "right" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { className: classes.helpTooltip, variant: "fab" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_3__["Help"], null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Collapse"], { in: false },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, "HELP"))));
    }
};
StreamingHelpManager = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__["Styled"])(_StreamingHelpManager_Style__WEBPACK_IMPORTED_MODULE_4__["streamingHelpManagerStyle"])
], StreamingHelpManager);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Style.ts":
/*!**********************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Style.ts ***!
  \**********************************************************************************************************************************************/
/*! exports provided: streamingHelpManagerStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "streamingHelpManagerStyle", function() { return streamingHelpManagerStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const streamingHelpManagerStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    helpTooltip: {
        height: theme.spacing.unit * 5,
        margin: theme.spacing.unit * 2,
        width: theme.spacing.unit * 5
    },
    root: {
        left: 0,
        position: "absolute",
        top: theme.spacing.unit * 7
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/index.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/index.ts ***!
  \*************************************************************************************************************************/
/*! exports provided: StreamingHelpManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StreamingHelpManager_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StreamingHelpManager.Component */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/StreamingHelpManager.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StreamingHelpManager", function() { return _StreamingHelpManager_Component__WEBPACK_IMPORTED_MODULE_0__["StreamingHelpManager"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Component.tsx":
/*!************************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Component.tsx ***!
  \************************************************************************************************************************************************/
/*! exports provided: InputSourcesDrawerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSourcesDrawerManager", function() { return InputSourcesDrawerManager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Module/stream/data/services/local_media */ "./src/application/modules/stream/data/services/local_media/index.ts");
/* harmony import */ var _Module_stream_data_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/data/store */ "./src/application/modules/stream/data/store/index.ts");
/* harmony import */ var _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Module/stream/data/store/source */ "./src/application/modules/stream/data/store/source/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/index.es.js");
/* harmony import */ var _InputSourcesSelectForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../InputSourcesSelectForm */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/index.ts");
/* harmony import */ var _InputSourcesDrawerManager_Style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./InputSourcesDrawerManager.Style */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











let InputSourcesDrawerManager = class InputSourcesDrawerManager extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = {
            showDrawer: false
        };
    }
    render() {
        const { classes } = this.props;
        const { showDrawer } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], { className: classes.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { title: "Configure source.", placement: "right" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], { className: classes.configureSourceTooltip, variant: "fab", onClick: this.onShowModal },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__["MoreVert"], null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["SwipeableDrawer"], { open: showDrawer, onClose: this.onHideModal, onOpen: this.onShowModal },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], { className: classes.drawerMenu, direction: "column", justify: "center", container: true },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], { variant: "h6", gutterBottom: true }, " Input Source "),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Divider"], null),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_InputSourcesSelectForm__WEBPACK_IMPORTED_MODULE_8__["InputSourcesSelectForm"], Object.assign({ onInputSourcesChange: this.onSourcesUpdate }, {})),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Divider"], null)))));
    }
    async onSourcesUpdate(devices) {
        const stream = await _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].getUserMedia(devices.videoInput, devices.audioInput);
        this.props.onSourceStreamAndDevicesUpdate(stream, devices);
    }
    onShowModal() {
        this.setState({ showDrawer: true });
    }
    onHideModal() {
        this.setState({ showDrawer: false });
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InputSourcesDrawerManager.prototype, "onSourcesUpdate", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InputSourcesDrawerManager.prototype, "onShowModal", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InputSourcesDrawerManager.prototype, "onHideModal", null);
InputSourcesDrawerManager = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_InputSourcesDrawerManager_Style__WEBPACK_IMPORTED_MODULE_9__["inputSourcesDrawerManagerStyle"]),
    Object(_Module_stream_data_store__WEBPACK_IMPORTED_MODULE_4__["StreamStoreConnect"])((state) => ({}), {
        onSourceStreamAndDevicesUpdate: (stream, devices) => new _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_5__["UpdateInputStreamAndSourcesAction"]({ stream, devices })
    })
], InputSourcesDrawerManager);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Style.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Style.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: inputSourcesDrawerManagerStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputSourcesDrawerManagerStyle", function() { return inputSourcesDrawerManagerStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const inputSourcesDrawerManagerStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    configureSourceTooltip: {
        height: theme.spacing.unit * 5,
        margin: theme.spacing.unit * 2,
        width: theme.spacing.unit * 5,
    },
    drawerMenu: {
        display: "flex",
        padding: theme.spacing.unit * 2,
        width: 350
    },
    root: {
        alignSelf: "flex-start",
        left: 0,
        position: "absolute",
        width: 0
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/index.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/index.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: InputSourcesDrawerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InputSourcesDrawerManager_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputSourcesDrawerManager.Component */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/InputSourcesDrawerManager.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputSourcesDrawerManager", function() { return _InputSourcesDrawerManager_Component__WEBPACK_IMPORTED_MODULE_0__["InputSourcesDrawerManager"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Component.tsx":
/*!******************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Component.tsx ***!
  \******************************************************************************************************************************************/
/*! exports provided: InputSourcesSelectForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSourcesSelectForm", function() { return InputSourcesSelectForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Module/stream/data/services/local_media */ "./src/application/modules/stream/data/services/local_media/index.ts");
/* harmony import */ var _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/data/services/local_media/EDeviceKind */ "./src/application/modules/stream/data/services/local_media/EDeviceKind.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/index.es.js");
/* harmony import */ var _Module_stream_view_components_elements_video_rendering_VideoPreview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Module/stream/view/components/elements/video_rendering/VideoPreview */ "./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/index.ts");
/* harmony import */ var _InputSourcesSelectForm_Style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./InputSourcesSelectForm.Style */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let InputSourcesSelectForm = class InputSourcesSelectForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = {
            previewStream: null,
            selectedInputSources: {
                audioInput: null,
                videoInput: null
            },
            audioInputSources: [],
            videoInputSources: []
        };
    }
    componentWillMount() {
        this.onUpdateMediaDevices()
            .then((inputSources) => {
            this.updatePreviewStream(inputSources.video[0], inputSources.audio[0]);
        });
    }
    componentWillUnmount() {
        _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].killStream(this.state.previewStream);
    }
    render() {
        const { classes } = this.props;
        const { audioInputSources, videoInputSources, selectedInputSources, previewStream } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], { className: classes.root, alignItems: "center", direction: "column", container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_video_rendering_VideoPreview__WEBPACK_IMPORTED_MODULE_7__["VideoPreview"], { className: classes.videoPreview, stream: previewStream }),
            this.renderDevicesSelection(videoInputSources, selectedInputSources.videoInput, "Video Input"),
            this.renderDevicesSelection(audioInputSources, selectedInputSources.audioInput, "Audio Input"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], { direction: "row", container: true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Button"], { className: classes.actionButton, onClick: this.onUpdateMediaDevices, variant: "outlined" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_6__["Refresh"], { color: "primary", style: { fontSize: "1.2rem" } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Button"], { className: classes.actionButton, onClick: this.onChangesAccept, variant: "outlined" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_6__["Check"], { color: "primary", style: { fontSize: "1.2rem" } })))));
    }
    renderDevicesSelection(devices, selected, label) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["FormControl"], { className: this.props.classes.inputSelectForm },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["InputLabel"], { htmlFor: "select-multiple" }, label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Select"], { value: (selected && selected.deviceId) || -1, onChange: (e) => this.handleDeviceSelection(devices.find((it) => it.deviceId === e.target.value)), input: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Input"], null) }, devices.map((device, idx) => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["MenuItem"], { key: device.deviceId, value: device.deviceId }, device.label || device.kind + idx))))));
    }
    async onUpdateMediaDevices() {
        const inputSources = await _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].getInputDevicesBundled();
        const { selectedInputSources: { videoInput, audioInput } } = this.state;
        const newState = {
            ...this.state,
            audioInputSources: inputSources.audio,
            videoInputSources: inputSources.video,
        };
        if (videoInput === null ||
            !inputSources.video.find((videoDevice) => videoDevice.deviceId === videoInput.deviceId)) {
            newState.selectedInputSources.videoInput = inputSources.video[0] || null;
        }
        if (audioInput === null ||
            !inputSources.audio.find((audioDevice) => audioDevice.deviceId === audioInput.deviceId)) {
            newState.selectedInputSources.audioInput = inputSources.audio[0] || null;
        }
        const { selectedInputSources } = newState;
        if (this.shouldPreviewStreamUpdate(this.state, newState)) {
            this.updatePreviewStream(selectedInputSources.videoInput, selectedInputSources.audioInput);
        }
        this.setState(newState);
        return inputSources;
    }
    handleDeviceSelection(device) {
        if (!device) {
            return;
        }
        const newState = { ...this.state, selectedInputSources: { ...this.state.selectedInputSources } };
        switch (device.kind) {
            case _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_4__["EDeviceKind"].AUDIO_INPUT:
                newState.selectedInputSources.audioInput = device;
                break;
            case _Module_stream_data_services_local_media_EDeviceKind__WEBPACK_IMPORTED_MODULE_4__["EDeviceKind"].VIDEO_INPUT:
                newState.selectedInputSources.videoInput = device;
                break;
        }
        if (this.shouldPreviewStreamUpdate(this.state, newState)) {
            this.updatePreviewStream(newState.selectedInputSources.videoInput, newState.selectedInputSources.audioInput);
        }
        this.setState(newState);
    }
    onChangesAccept() {
        this.props.onInputSourcesChange(this.state.selectedInputSources);
    }
    shouldPreviewStreamUpdate(oldState, newState) {
        const { selectedInputSources: oldSources } = oldState;
        const { selectedInputSources: newSources } = newState;
        return (oldSources.audioInput !== newSources.audioInput || oldSources.videoInput !== newSources.videoInput);
    }
    async updatePreviewStream(videoDevice, audioDevice) {
        const stream = await _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].getUserMedia(videoDevice, audioDevice);
        _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].killStream(this.state.previewStream);
        this.setState({
            previewStream: stream,
            selectedInputSources: {
                audioInput: audioDevice,
                videoInput: videoDevice
            }
        });
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InputSourcesSelectForm.prototype, "onUpdateMediaDevices", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputSourcesSelectForm.prototype, "handleDeviceSelection", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InputSourcesSelectForm.prototype, "onChangesAccept", null);
InputSourcesSelectForm = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_InputSourcesSelectForm_Style__WEBPACK_IMPORTED_MODULE_8__["inputSourcesSelectFormStyle"])
], InputSourcesSelectForm);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Style.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Style.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: inputSourcesSelectFormStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputSourcesSelectFormStyle", function() { return inputSourcesSelectFormStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const inputSourcesSelectFormStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    actionButton: {
        flexGrow: 1,
        margin: theme.spacing.unit
    },
    inputSelectForm: {
        maxWidth: "100%",
        padding: theme.spacing.unit,
        width: "100%"
    },
    root: {
        height: "100%",
        justifyContent: "center",
        overflow: "auto",
        padding: theme.spacing.unit,
        width: "100%"
    },
    videoPreview: {
        backgroundColor: "black",
        height: 180,
        marginBottom: theme.spacing.unit * 3,
        width: 300
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/index.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/index.ts ***!
  \**************************************************************************************************************/
/*! exports provided: InputSourcesSelectForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InputSourcesSelectForm_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputSourcesSelectForm.Component */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesSelectForm/InputSourcesSelectForm.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputSourcesSelectForm", function() { return _InputSourcesSelectForm_Component__WEBPACK_IMPORTED_MODULE_0__["InputSourcesSelectForm"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Component.tsx":
/*!*****************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Component.tsx ***!
  \*****************************************************************************************************************************************/
/*! exports provided: RenderedVideoPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderedVideoPreview", function() { return RenderedVideoPreview; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/canvas_video_graphics */ "./src/application/lib/react_lib/canvas_video_graphics/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Module_stream_view_components_elements_canvas_objects_management_StreamingHelpManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/view/components/elements/canvas_objects_management/StreamingHelpManager */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/StreamingHelpManager/index.ts");
/* harmony import */ var _Module_stream_view_components_elements_input_source_InputSourcesDrawerManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Module/stream/view/components/elements/input_source/InputSourcesDrawerManager */ "./src/application/modules/stream/view/components/elements/input_source/InputSourcesDrawerManager/index.ts");
/* harmony import */ var _Module_stream_view_containers_elements_CanvasObjectAdditionManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Module/stream/view/containers/elements/CanvasObjectAdditionManager */ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/index.ts");
/* harmony import */ var _RenderedVideoPreview_Style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RenderedVideoPreview.Style */ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let RenderedVideoPreview = class RenderedVideoPreview extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    // todo: Return combined stream there ready for processing.
    render() {
        const { renderObjects, showPreview, showGraphics, showGrid, stream } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Grid"], { className: this.props.classes.root, justify: "center", alignItems: "center", container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Lib_react_lib_canvas_video_graphics__WEBPACK_IMPORTED_MODULE_2__["CanvasGraphicsPreprocessor"], { stream: stream, renderingObjects: renderObjects, showGrid: showGrid, showGraphics: showGraphics, showPreview: showPreview }),
            this.renderHelperManagers()));
    }
    renderHelperManagers() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_containers_elements_CanvasObjectAdditionManager__WEBPACK_IMPORTED_MODULE_6__["CanvasObjectAdditionManager"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_input_source_InputSourcesDrawerManager__WEBPACK_IMPORTED_MODULE_5__["InputSourcesDrawerManager"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_canvas_objects_management_StreamingHelpManager__WEBPACK_IMPORTED_MODULE_4__["StreamingHelpManager"], Object.assign({}, {}))));
    }
};
RenderedVideoPreview = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_1__["Styled"])(_RenderedVideoPreview_Style__WEBPACK_IMPORTED_MODULE_7__["renderedVideoPreviewStyle"])
], RenderedVideoPreview);



/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Style.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Style.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: renderedVideoPreviewStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderedVideoPreviewStyle", function() { return renderedVideoPreviewStyle; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

const renderedVideoPreviewStyle = (theme) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    root: {
        boxSizing: "border-box",
        flexBasis: "20rem",
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        width: "100%",
        "& canvas": {
            background: `linear-gradient(to bottom, ${theme.palette.primary.light} 15%, ${theme.palette.primary.dark} 95%);`
        }
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/index.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/index.ts ***!
  \***************************************************************************************************************/
/*! exports provided: RenderedVideoPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RenderedVideoPreview_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RenderedVideoPreview.Component */ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/RenderedVideoPreview.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderedVideoPreview", function() { return _RenderedVideoPreview_Component__WEBPACK_IMPORTED_MODULE_0__["RenderedVideoPreview"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/VideoPreview.tsx":
/*!***************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/VideoPreview.tsx ***!
  \***************************************************************************************************************/
/*! exports provided: VideoPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPreview", function() { return VideoPreview; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


class VideoPreview extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.videoElementRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    }
    componentWillMount() {
        this.setVideoSource(this.props.stream);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.stream !== this.props.stream) {
            this.setVideoSource(this.props.stream);
        }
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("video", { className: this.props.className, ref: this.videoElementRef, autoPlay: true }));
    }
    setVideoSource(stream) {
        const videoElement = this.videoElementRef.current;
        if (videoElement) {
            videoElement.srcObject = null;
            videoElement.srcObject = stream;
        }
    }
}


/***/ }),

/***/ "./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/index.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/index.ts ***!
  \*******************************************************************************************************/
/*! exports provided: VideoPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoPreview */ "./src/application/modules/stream/view/components/elements/video_rendering/VideoPreview/VideoPreview.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoPreview", function() { return _VideoPreview__WEBPACK_IMPORTED_MODULE_0__["VideoPreview"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Component.tsx":
/*!***************************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Component.tsx ***!
  \***************************************************************************************************************************************/
/*! exports provided: CanvasObjectAdditionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasObjectAdditionManager", function() { return CanvasObjectAdditionManager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/index.es.js");
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Lib_util_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Lib/util/logger */ "./src/application/lib/util/logger/index.ts");
/* harmony import */ var _Module_stream_data_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Module/stream/data/store */ "./src/application/modules/stream/data/store/index.ts");
/* harmony import */ var _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Module/stream/data/store/graphics */ "./src/application/modules/stream/data/store/graphics/index.ts");
/* harmony import */ var _Module_stream_view_components_elements_canvas_objects_management_CanvasObjectsAdditionList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Module/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList/index.ts");
/* harmony import */ var _CanvasObjectAdditionManager_Style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CanvasObjectAdditionManager.Style */ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











let CanvasObjectAdditionManager = class CanvasObjectAdditionManager extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = {
            showAdditionWindow: false
        };
        this.contentRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    }
    componentDidMount() {
        window.addEventListener("mousedown", this.handleWindowClick);
    }
    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleWindowClick);
    }
    render() {
        const { classes, onObjectAdded, inputStream } = this.props;
        const { showAdditionWindow } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: showAdditionWindow ? classes.root : classes.rootEmpty, ref: this.contentRef },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { title: "Add object.", placement: "right" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { className: classes.addObjectTooltip, disabled: inputStream === null, variant: "fab", onClick: this.onToggleShowAdditionWindow }, showAdditionWindow ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_3__["Remove"], null) : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons__WEBPACK_IMPORTED_MODULE_3__["Add"], null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Collapse"], { in: showAdditionWindow },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_canvas_objects_management_CanvasObjectsAdditionList__WEBPACK_IMPORTED_MODULE_8__["CanvasObjectsAdditionList"], Object.assign({ onObjectAdded: onObjectAdded }, {})))));
    }
    handleWindowClick(event) {
        const target = this.contentRef.current && this.contentRef.current.querySelector("ul");
        const isAnotherComponentClicked = (target && !target.contains(event.target));
        if (this.state.showAdditionWindow === true && isAnotherComponentClicked === true) {
            this.setState({ showAdditionWindow: false });
        }
    }
    onObjectAdded() {
        this.props.onObjectAdded("");
    }
    onObjectRemoved() {
        this.props.onObjectRemoved("");
    }
    onObjectChanged() {
        this.props.onObjectChanged("");
    }
    onToggleShowAdditionWindow(event) {
        event.stopPropagation();
        this.setState({ showAdditionWindow: !this.state.showAdditionWindow });
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], CanvasObjectAdditionManager.prototype, "handleWindowClick", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CanvasObjectAdditionManager.prototype, "onObjectAdded", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CanvasObjectAdditionManager.prototype, "onObjectRemoved", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CanvasObjectAdditionManager.prototype, "onObjectChanged", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasObjectAdditionManager.prototype, "onToggleShowAdditionWindow", null);
CanvasObjectAdditionManager = __decorate([
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_4__["Styled"])(_CanvasObjectAdditionManager_Style__WEBPACK_IMPORTED_MODULE_9__["canvasObjectAdditionManagerStyle"]),
    Object(_Module_stream_data_store__WEBPACK_IMPORTED_MODULE_6__["StreamStoreConnect"])((store) => ({
        inputStream: store.source.inputStream
    }), {
        onObjectAdded: (object) => new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_7__["AddGraphicsObjectAction"]({ object }),
        onObjectChanged: (object) => _Lib_util_logger__WEBPACK_IMPORTED_MODULE_5__["log"].error(object),
        onObjectRemoved: (object) => _Lib_util_logger__WEBPACK_IMPORTED_MODULE_5__["log"].error(object)
    })
], CanvasObjectAdditionManager);



/***/ }),

/***/ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Style.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Style.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: canvasObjectAdditionManagerStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasObjectAdditionManagerStyle", function() { return canvasObjectAdditionManagerStyle; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);

const canvasObjectAdditionManagerStyle = (theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    addObjectTooltip: {
        height: theme.spacing.unit * 5,
        margin: theme.spacing.unit * 2,
        width: theme.spacing.unit * 5,
    },
    root: {
        alignSelf: "flex-start",
        left: 0,
        position: "absolute",
        top: theme.spacing.unit * 13
    },
    rootEmpty: {
        alignSelf: "flex-start",
        left: 0,
        position: "absolute",
        top: theme.spacing.unit * 13,
        width: 0
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/index.ts":
/*!******************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/index.ts ***!
  \******************************************************************************************************/
/*! exports provided: CanvasObjectAdditionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanvasObjectAdditionManager_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasObjectAdditionManager.Component */ "./src/application/modules/stream/view/containers/elements/CanvasObjectAdditionManager/CanvasObjectAdditionManager.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasObjectAdditionManager", function() { return _CanvasObjectAdditionManager_Component__WEBPACK_IMPORTED_MODULE_0__["CanvasObjectAdditionManager"]; });




/***/ }),

/***/ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Component.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Component.tsx ***!
  \****************************************************************************************************************************/
/*! exports provided: StreamConfigurationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamConfigurationPage", function() { return StreamConfigurationPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-cbd */ "./node_modules/redux-cbd/index.js");
/* harmony import */ var redux_cbd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_cbd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Lib/react_lib/@material_ui */ "./src/application/lib/react_lib/@material_ui/index.ts");
/* harmony import */ var _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Module/stream/data/services/local_media */ "./src/application/modules/stream/data/services/local_media/index.ts");
/* harmony import */ var _Module_stream_data_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Module/stream/data/store */ "./src/application/modules/stream/data/store/index.ts");
/* harmony import */ var _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Module/stream/data/store/graphics */ "./src/application/modules/stream/data/store/graphics/index.ts");
/* harmony import */ var _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Module/stream/data/store/source */ "./src/application/modules/stream/data/store/source/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Main/view/containers/elements/HeaderBar */ "./src/application/modules/main/view/containers/elements/HeaderBar/index.ts");
/* harmony import */ var _Module_stream_view_components_elements_canvas_objects_management_PreviewConfigurationBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @Module/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock */ "./src/application/modules/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock/index.ts");
/* harmony import */ var _Module_stream_view_components_elements_video_rendering_RenderedVideoPreview__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @Module/stream/view/components/elements/video_rendering/RenderedVideoPreview */ "./src/application/modules/stream/view/components/elements/video_rendering/RenderedVideoPreview/index.ts");
/* harmony import */ var _StreamConfigurationPage_Style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./StreamConfigurationPage.Style */ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Style.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let StreamConfigurationPage = class StreamConfigurationPage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = {
            currentTab: 0
        };
    }
    componentWillMount() {
        this.setDefaultVideo();
    }
    render() {
        const { classes, renderObjects, showPreview, showGraphics, showGrid, inputStream } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.root, direction: "column", wrap: "nowrap", container: true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Main_view_containers_elements_HeaderBar__WEBPACK_IMPORTED_MODULE_8__["HeaderBar"], Object.assign({}, {})),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.content, container: true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.streamingVideoSection, direction: "row", container: true },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.streamingVideo, item: true },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_video_rendering_RenderedVideoPreview__WEBPACK_IMPORTED_MODULE_10__["RenderedVideoPreview"], Object.assign({ stream: inputStream, renderObjects: renderObjects, showGrid: showGrid, showGraphics: showGraphics, showPreview: showPreview }, {}))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.configSidebar, item: true },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Module_stream_view_components_elements_canvas_objects_management_PreviewConfigurationBlock__WEBPACK_IMPORTED_MODULE_9__["PreviewConfigurationBlock"], Object.assign({ showGrid: showGrid, showGraphics: showGraphics, showPreview: showPreview, onPreviewToggle: this.onTogglePreviewMode, onGraphicsToggle: this.onToggleGraphics, onGridToggle: this.onToggleGridDisplay }, {})))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Grid"], { className: classes.under }, this.renderTabs()))));
    }
    // Todo:
    renderTabs() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["AppBar"], { position: "relative", color: "default" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Tabs"], { value: this.state.currentTab, onChange: this.onTabChange, scrollButtons: "on", indicatorColor: "primary", textColor: "primary" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Tab"], { label: "Graphics" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Tab"], { label: "Something else..." }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Tab"], { label: "Something else..." }))));
    }
    async setDefaultVideo() {
        const { selectedDevices, updateStreamAndSources } = this.props;
        const stream = await _Module_stream_data_services_local_media__WEBPACK_IMPORTED_MODULE_3__["localMediaService"].getUserMedia(selectedDevices.videoInput, selectedDevices.audioInput);
        updateStreamAndSources(stream, selectedDevices);
    }
    onTabChange(event, tabNumber) {
        this.setState({ currentTab: +tabNumber });
    }
    onToggleGridDisplay(show) {
        this.props.setGridDisplay(show);
    }
    onToggleGraphics(show) {
        this.props.setGraphicsDisplay(show);
    }
    onTogglePreviewMode(show) {
        this.props.setPreviewMode(show);
    }
};
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StreamConfigurationPage.prototype, "onTabChange", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], StreamConfigurationPage.prototype, "onToggleGridDisplay", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], StreamConfigurationPage.prototype, "onToggleGraphics", null);
__decorate([
    redux_cbd__WEBPACK_IMPORTED_MODULE_1__["Bind"],
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], StreamConfigurationPage.prototype, "onTogglePreviewMode", null);
StreamConfigurationPage = __decorate([
    Object(_Module_stream_data_store__WEBPACK_IMPORTED_MODULE_4__["StreamStoreConnect"])((store) => ({
        inputStream: store.source.inputStream,
        selectedDevices: store.source.selectedDevices,
        renderObjects: store.graphics.objects,
        showGraphics: store.graphics.showGraphics,
        showGrid: store.graphics.showGrid,
        showPreview: store.graphics.showPreview,
    }), {
        setGraphicsDisplay: (show) => new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_5__["SetGraphicsDisplayAction"]({ show }),
        setGridDisplay: (show) => new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_5__["SetGridDisplayAction"]({ show }),
        setPreviewMode: (show) => new _Module_stream_data_store_graphics__WEBPACK_IMPORTED_MODULE_5__["SetPreviewModeAction"]({ show }),
        updateStreamAndSources: (stream, devices) => new _Module_stream_data_store_source__WEBPACK_IMPORTED_MODULE_6__["UpdateInputStreamAndSourcesAction"]({ stream, devices })
    }),
    Object(_Lib_react_lib_material_ui__WEBPACK_IMPORTED_MODULE_2__["Styled"])(_StreamConfigurationPage_Style__WEBPACK_IMPORTED_MODULE_11__["streamConfigurationPageStyle"])
], StreamConfigurationPage);



/***/ }),

/***/ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Style.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Style.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: streamConfigurationPageStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "streamConfigurationPageStyle", function() { return streamConfigurationPageStyle; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

const streamConfigurationPageStyle = (theme) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createStyles"])({
    configSidebar: {
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minWidth: 250,
        padding: theme.spacing.unit
    },
    content: {
        flexDirection: "column",
        flexGrow: 75,
        flexWrap: "nowrap",
        overflow: "auto",
        width: "100%"
    },
    root: {
        width: "100%"
    },
    streamingVideo: {
        "@media (max-width: 1225px)": {
            width: "100%",
        },
        "@media (min-width: 1225px)": {
            width: "75%",
        },
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        flexDirection: "column",
        minHeight: 350,
        minWidth: "75%",
        padding: theme.spacing.unit,
        position: "relative"
    },
    streamingVideoSection: {
        justifyContent: "center",
        minHeight: 600,
        overflow: "auto",
        width: "100%"
    },
    under: {
        backgroundColor: theme.palette.secondary.light,
        flexGrow: 1,
        minHeight: 200
    }
});


/***/ }),

/***/ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/index.ts":
/*!***********************************************************************************************!*\
  !*** ./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/index.ts ***!
  \***********************************************************************************************/
/*! exports provided: StreamConfigurationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StreamConfigurationPage_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StreamConfigurationPage.Component */ "./src/application/modules/stream/view/containers/pages/StreamConfigurationPage/StreamConfigurationPage.Component.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StreamConfigurationPage", function() { return _StreamConfigurationPage_Component__WEBPACK_IMPORTED_MODULE_0__["StreamConfigurationPage"]; });




/***/ })

}]);
//# sourceMappingURL=map/stream@stream-configuration-page.bundle.map