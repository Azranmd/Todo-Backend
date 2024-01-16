"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Instantiate express app
const app = (0, express_1.default)();
//Define Server Port
const port = process.env.PORT;
//Create Default Route
app.get('/', (req, res) => {
    res.send('Express + TypeScript 33000');
});
//Listening Port
app.listen(port);
