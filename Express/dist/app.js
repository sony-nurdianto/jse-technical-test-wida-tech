"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const port = 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`Server is runnning on port:${port}`);
});
