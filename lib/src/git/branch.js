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
const misc_1 = require("../utility/misc");
var EIssueType;
(function (EIssueType) {
    EIssueType["Bug"] = "Bug";
    EIssueType["Story"] = "Story";
})(EIssueType = exports.EIssueType || (exports.EIssueType = {}));
function createBranchByIssue(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = data.key;
        let issuetype_name = data.fields.issuetype.name;
        let fields_summary = data.fields.summary;
        let branchName = `${key}#${issuetype_name}##${fields_summary}`;
        branchName = branchName.split(' ').join('-');
        let cmd = `git branch "${branchName}"`;
        yield (misc_1.runCommand(cmd));
        return branchName;
    });
}
exports.createBranchByIssue = createBranchByIssue;
function checkoutBranch(branch) {
    return misc_1.runCommand(`git checkout "${branch}"`);
}
exports.checkoutBranch = checkoutBranch;
//# sourceMappingURL=branch.js.map