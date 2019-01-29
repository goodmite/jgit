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
const issues_1 = require("../jira/issues");
const inquirerer_1 = require("../inquirerer");
const branch_1 = require("../git/branch");
function issueFlowInit() {
    return __awaiter(this, void 0, void 0, function* () {
        let iIssueList = yield issues_1.listIssues();
        let issueSummeryList = iIssueList.issues.map((issue) => {
            let key = issue.key;
            let summary = issue.fields.summary;
            return `${key} - ${summary}`;
        });
        let selectedIssueSummery = (yield inquirerer_1.ask({
            message: 'Please select an issue:',
            choices: issueSummeryList,
            type: 'list'
        })).name;
        let selectedIssueIndex = issueSummeryList.findIndex(el => el === selectedIssueSummery);
        let selectedIssue = iIssueList.issues[selectedIssueIndex];
        let branchName = yield branch_1.createBranchByIssue(selectedIssue);
        if (branchName) {
            console.log(branchName + ' created');
        }
        else {
            console.log('error creating branch');
            return;
        }
        try {
            yield branch_1.checkoutBranch(branchName);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.issueFlowInit = issueFlowInit;
//# sourceMappingURL=issue.js.map