import {listIssues} from "../jira/issues";
import {IIssue, IIssueList} from "../../interfaces";
import {ask} from "../inquirerer";
import {checkoutBranch, createBranchByIssue} from "../git/branch";

export async function issueFlowInit() {
  let iIssueList: IIssueList = await listIssues();
  let issueSummeryList: string[] = iIssueList.issues.map((issue) => {
    let key = issue.key;
    let summary = issue.fields.summary;
    return `${key} - ${summary}`
  });

  let selectedIssueSummery: string = (await ask({
    message: 'Please select an issue:',
    choices: issueSummeryList,
    type: 'list'
  })).name;

  let selectedIssueIndex = issueSummeryList.findIndex(el => el === selectedIssueSummery);
  let selectedIssue: IIssue = iIssueList.issues[selectedIssueIndex];

  let branchName = await createBranchByIssue(selectedIssue);
  if(branchName){
    console.log(branchName + ' created');
  }else {
    console.log('error creating branch');
    return;
  }

  try {
    await checkoutBranch(branchName);
  }catch (e) {
    console.log(e);
  }
}