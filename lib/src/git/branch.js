"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../utility/misc");
var EIssueType;
(function (EIssueType) {
    EIssueType["Bug"] = "Bug";
    EIssueType["Story"] = "Story";
})(EIssueType = exports.EIssueType || (exports.EIssueType = {}));
function createBranch(data) {
    let { key, fields_summary, issuetype_name } = data;
    let branchName = `${key}#${issuetype_name}##${fields_summary}`;
    let cmd = `git branch ${branchName}`;
    return misc_1.runCommand(cmd);
}
exports.createBranch = createBranch;
//# sourceMappingURL=branch.js.map