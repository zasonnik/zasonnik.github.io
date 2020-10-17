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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/desk.js":
/*!************************!*\
  !*** ./src/js/desk.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Desk; });\nconst hex_edge_angle = Math.PI / 3.0;\nconst hex_edge_width = Math.cos(hex_edge_angle);\nconst hex_edge_height = Math.sin(hex_edge_angle)*1;\nconst hex_width = 1.0 + (hex_edge_width*2.0);\nconst hex_height = hex_edge_height*2;\n\nclass Desk {\n  constructor(hex_count) {\n    this.width = hex_count.width;\n    this.height = hex_count.height;\n    this._borders = [];\n  }\n\n  static getNearbyHex(point){\n    return [\n      {x: point.x, y: point.y+2},\n      {x: point.x, y: point.y-2},\n      {x: point.x + 1, y: point.y+1},\n      {x: point.x + 1, y: point.y-1},\n      {x: point.x - 1, y: point.y+1},\n      {x: point.x - 1, y: point.y-1}\n    ]\n  }\n\n  set contexts(contexts) {\n    this.base_context = contexts.base;\n    this.selection_context = contexts.selection;\n    this.borders_context = contexts.borders;\n  }\n\n  set contexts_size(size){\n    this.contexts_width = size.width;\n    this.contexts_height = size.height;\n  }\n\n  getSize(){\n    const l_size = hexSizeInLength(this.width, this.contexts_width);\n    const h_size = hexSizeInHeight(this.height, this.contexts_height);\n    return Math.min(l_size, h_size);\n  }\n\n  set borders(borders_array){\n    this._borders = borders_array;\n  }\n\n  drawBorders(){\n    const hex_style = {\n      stroke: \"brown\",\n      fill: \"brown\"\n    };\n    this.borders_context.clearRect(0, 0, this.contexts_width, this.contexts_height);\n    this._borders.forEach(hex => {\n      this.drawHexByCoords(hex.x, hex.y, this.borders_context, hex_style);\n    });\n\n  }\n\n  clearSelection(){\n    this.selection_context.clearRect(0, 0, this.contexts_width, this.contexts_height);\n  }\n\n  drawHexByCoords(x, y, context, style){\n    x -= 1;\n    x = parseInt(x/2);\n    y -= 1;\n    const size = this.getSize();\n    const start_x = (y%2) ? (size + size*hex_edge_width) : 0;\n    const left_x = x*(hex_width+1)*size + start_x;\n    const left_y = size * hex_edge_height + y * hex_edge_height * size;\n    drowHexOnContext(context, {x: left_x, y: left_y}, size, style);\n  }\n\n  drowSelectionHex(x, y){\n    const hex_style = {\n      stroke: \"red\",\n      fill: \"pink\"\n    };\n    this.drawHexByCoords(x, y, this.selection_context, hex_style);\n  }\n\n  getHexByPosition(x, y){\n    const size = this.getSize();\n    //get heights\n    const v_size = hex_edge_height * size;\n    let hex_y = parseInt(y / v_size) + 1\n    const h_size = (hex_width - hex_edge_width)*size;\n    let hex_x = parseInt(x/h_size) + 1;\n    const left_edge = {\n      y: hex_y * v_size,\n      x: (hex_x - 1)*h_size\n    }\n    const right_edge = {\n      x: left_edge.x + (hex_edge_width*size),\n      y: left_edge.y - (hex_edge_height*size)\n    }\n    if(hex_y % 2 != hex_x % 2){\n      left_edge.x += hex_edge_width*size;\n      right_edge.x -= hex_edge_width*size;\n    }\n    const direction = (x - left_edge.x) * (right_edge.y - left_edge.y) - (y - left_edge.y) * (right_edge.x - left_edge.x);\n\n    if(hex_y % 2 != hex_x % 2){\n      if(direction < 0){\n        hex_y -= 1;\n      } else {\n        hex_x -= 1;\n      }\n    } else {\n      if(direction > 0){\n        hex_x -= 1;\n        hex_y -= 1;\n      }\n    }\n    if(hex_x > this.width || hex_y > this.height){\n      return null;\n    }\n    return {\n      x: hex_x,\n      y: hex_y\n    };\n  }\n\n  drowBase(){\n    const size = this.getSize();\n    const x_count_odd = this.width % 2 == 0;\n    const base_hex_style = {\n      stroke: \"blue\",\n      fill: \"yellow\"\n    };\n    for(let y = 0; y<this.height; y++){\n      const current_y = size * hex_edge_height + y * hex_edge_height*size;\n      const start_x = (y%2) ? (size + size*hex_edge_width) : 0;\n      const count_x = this.width/2 - (x_count_odd ? 0 : (y%2 ? 1 : 0));\n      for(let x = 0; x<count_x; x++){\n        const left_x = x*(hex_width+1)*size + start_x;\n        const left_y = current_y;\n        drowHexOnContext(this.base_context, {x: left_x, y: left_y}, size, base_hex_style);\n        // if(true){\n        //   const x_coord = y%2 ? x*2+2 : x*2+1;\n        //   this.base_context.fillStyle = 'black';\n        //   this.base_context.fillText(`x: ${x_coord}, y: ${y+1}`, left_x+5, left_y);\n        // }\n      }\n    }\n  }\n\n  getPath(from, to, borders){\n    const self = this;\n    const used_hex = [from];\n    const ways = new Map();\n    let last_hex = [from];\n\n    while (!isArrayContainHex(last_hex, to)) {\n      const new_last_hex = [];\n      for(const h of last_hex){\n        const avalible_ways = Desk.getNearbyHex(h).filter(h => !(\n            isHexOutsideDesk(h) ||\n            isArrayContainHex(borders, h) ||\n            isArrayContainHex(used_hex, h)\n          ));\n        for(const av of avalible_ways){\n          ways.set(av, h);\n          if(av.x==to.x && av.y==to.y){\n            ways.set(to, h);\n          }\n        }\n        new_last_hex.push.apply(new_last_hex, avalible_ways);\n        used_hex.push.apply(used_hex, avalible_ways);\n      }\n      if(new_last_hex.length === 0){\n        return false; //No way\n      }\n      last_hex = new_last_hex;\n    }\n\n    const path = [to];\n    while (!(path[0].x==from.x && path[0].y==from.y)) {\n      const point_before = ways.get(path[0]);\n      if(!point_before){\n        return false;\n      }\n      path.splice(0,0, point_before);\n    }\n\n    return path;\n    function isArrayContainHex(arr, hex){\n      return arr.some(e => e.x === hex.x && e.y === hex.y)\n    }\n    function isHexOutsideDesk(hex){\n      return hex.x < 1 ||\n             hex.y < 1 ||\n             hex.x > self.width ||\n             hex.y > self.height;\n    }\n  }\n\n  getStraigthPath(from, to){\n    const current = from;\n    const res = [];\n    while (!(current.x==to.x && current.y==to.y)) {\n      if(current.x == to.x){\n        current.y += to.y > current.y ? 2 : -2;\n        res.push({x: current.x, y: current.y});\n      } else {\n        current.x += to.x > current.x ? 1 : -1;\n        current.y += to.y > current.y ? 1 : -1;\n        res.push({x: current.x, y: current.y});\n      }\n    }\n    return res;\n  }\n}\n\nfunction drowHexOnContext(context, left_position, size, style){\n  const sized_hex_edge_width = hex_edge_width * size;\n  const sized_hex_edge_height = hex_edge_height * size;\n  context.beginPath();\n  context.strokeStyle = style.stroke;\n  context.fillStyle = style.fill;\n  let current_x = left_position.x;\n  let current_y = left_position.y;\n  context.moveTo(current_x, current_y);\n  current_x += sized_hex_edge_width;\n  current_y -= sized_hex_edge_height;\n  context.lineTo(current_x, current_y);\n  current_x += size;\n  context.lineTo(current_x, current_y);\n  current_x += sized_hex_edge_width;\n  current_y += sized_hex_edge_height;\n  context.lineTo(current_x, current_y);\n  current_x -= sized_hex_edge_width;\n  current_y += sized_hex_edge_height;\n  context.lineTo(current_x, current_y);\n  current_x -= size;\n  context.lineTo(current_x, current_y);\n  context.closePath();\n  context.fill();\n  context.stroke();\n}\n\nfunction hexSizeInLength(count, length){\n  const line_size = count*(1+hex_edge_width)+hex_edge_width;\n  return parseInt(length / line_size);\n}\n\nfunction hexSizeInHeight(count, length){\n   const line_size = count * hex_edge_height + hex_edge_height;\n  return parseInt(length / line_size);\n}\n\n\n//# sourceURL=webpack:///./src/js/desk.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _desk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./desk */ \"./src/js/desk.js\");\n\n\nconst desk_params = {width: 20, height: 20};\n\ndocument.addEventListener(\"DOMContentLoaded\", ()=>{\n  const full_screen_div = createFullscreenDiv();\n  document.body.appendChild(full_screen_div);\n  const desk = new _desk__WEBPACK_IMPORTED_MODULE_0__[\"default\"](desk_params);\n\n  window.addEventListener(\"resize\", redraw_desk);\n  redraw_desk();\n\n  const selected_hexs = [];\n  const borders = [];\n\n  full_screen_div.addEventListener(\"click\", (event) => {\n    const clicked = desk.getHexByPosition(event.x, event.y);\n    if(clicked){\n      if(selected_hexs.length==2){\n        selected_hexs.splice(0, 1);\n      }\n      selected_hexs.push({x: clicked.x, y: clicked.y});\n    }\n    desk.clearSelection();\n    selected_hexs.forEach(hex => {\n      desk.drowSelectionHex(hex.x, hex.y);\n    });\n    if(selected_hexs.length==2){\n      const path = desk.getPath(selected_hexs[0], selected_hexs[1], borders);\n      if(path){\n        path.forEach(hex => {\n          desk.drowSelectionHex(hex.x, hex.y);\n        });\n      }\n    }\n  });\n\n\n\n  full_screen_div.addEventListener(\"contextmenu\", (event) => {\n    const clicked = desk.getHexByPosition(event.x, event.y);\n    if(clicked){\n      event.preventDefault();\n      const finded_index =  borders.findIndex((b)=> b.x==clicked.x && b.y==clicked.y);\n      if(finded_index>=0){\n        borders.splice(finded_index, 1);\n      } else {\n        borders.push(clicked);\n      }\n    }\n    desk.borders = borders;\n    desk.drawBorders();\n  });\n\n  function redraw_desk(){\n    let old_context = null;\n    while (old_context = full_screen_div.querySelector(\"canvas\")) {\n      full_screen_div.removeChild(old_context)\n    };\n    desk.contexts = {\n      base: createCanvasContext(full_screen_div),\n      selection: createCanvasContext(full_screen_div),\n      borders: createCanvasContext(full_screen_div),\n    };\n    desk.contexts_size = {\n      width: full_screen_div.offsetWidth,\n      height: full_screen_div.offsetHeight\n    };\n    desk.drowBase();\n  }\n});\n\nfunction createFullscreenDiv(){\n  const full_screen_div = document.createElement(\"div\");\n  full_screen_div.style.position = \"fixed\";\n  full_screen_div.style.width = \"100%\";\n  full_screen_div.style.height = \"100%\";\n  full_screen_div.style.left = \"0\";\n  full_screen_div.style.top = \"0\";\n  full_screen_div.style.background = \"rgba(51,51,51,0.7)\";\n  full_screen_div.style[\"z-index\"] = \"0\";\n  return full_screen_div;\n}\n\nfunction createCanvasContext(parent) {\n  const canvas = document.createElement(\"canvas\");\n  canvas.style.position = \"fixed\";\n  canvas.style.width = \"100%\";\n  canvas.style.height = \"100%\";\n  canvas.style.display = \"block\";\n  canvas.style[\"z-index\"] = `${parent.querySelectorAll(\"canvas\").length + 1}`;\n  parent.appendChild(canvas);\n  resizeCanvasToReal(canvas);\n  return canvas.getContext(\"2d\");\n}\n\nfunction resizeCanvasToReal(canvas){\n  const parent = canvas.parentElement;\n  canvas.width = parent.offsetWidth;\n  canvas.height = parent.offsetHeight;\n}\n\nconsole.log(\"Hi webpack\");\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });