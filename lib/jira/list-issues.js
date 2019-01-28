"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("../utility/fs");
const path_1 = require("path");
function listIssues() {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        let filePath = path_1.join(__dirname, '../../jql-result.json');
        data = yield fs_1.readFile(filePath);
        return JSON.parse(data.toString()).issues;
    });
}
exports.listIssues = listIssues;
//# sourceMappingURL=list-issues.js.map