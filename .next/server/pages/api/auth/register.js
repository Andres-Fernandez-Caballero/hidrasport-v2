"use strict";
(() => {
var exports = {};
exports.id = 7;
exports.ids = [7];
exports.modules = {

/***/ 6122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LB: () => (/* binding */ SERVER_URL)
/* harmony export */ });
/* unused harmony exports WHATSAPP_BUSSINESS_NUMBER, AFIP_QR, AFFIP_DATA_WEB */
const WHATSAPP_BUSSINESS_NUMBER = (/* unused pure expression or super */ null && ("123" || 0));
const AFIP_QR = (/* unused pure expression or super */ null && ("123" || 0));
const AFFIP_DATA_WEB = (/* unused pure expression or super */ null && ("123" || 0));
const SERVER_URL = "http://127.0.0.1:8000" || 0;


/***/ }),

/***/ 8285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6122);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function handler(req, res) {
    if (req.method === "POST") {
        fetch(`${_config_index__WEBPACK_IMPORTED_MODULE_0__/* .SERVER_URL */ .LB}/api/accounts/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        }).then((response)=>{
            if (response.ok) {
                response.json().then((data)=>{
                    delete data.response;
                    res.status(200).json(data);
                });
            } else {
                throw new Error("Error al iniciar sesi\xf3n " + response.statusText);
            }
        }).catch((error)=>{
            res.status(500).json({
                message: error.message
            });
        });
    } else {
        res.status(405).json({
            message: "Method not allowed"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8285));
module.exports = __webpack_exports__;

})();