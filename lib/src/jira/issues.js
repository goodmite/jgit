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
const JiraApi = require('jira-client');
const jira = new JiraApi({
    protocol: 'https',
    host: 'jira.imimobile.com',
    username: 'sandeepkumar.g',
    password: 'Dec@2018',
    apiVersion: '2',
    strictSSL: true
});
function listIssues() {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.readFileAsync(path_1.join(__dirname, '/../../../issues.json'));
        // return jira.getUsersIssues('sandeepkumar.g', false)
        //   .then((val)=>{
        //     console.log(val);
        //   });
    });
}
exports.listIssues = listIssues;
//# sourceMappingURL=issues.js.map