import {listIssues} from "../jira/issues";
import {IIssue, IIssueList} from "../../interfaces";
import {ask} from "../inquirerer";
import {checkoutBranch, createBranchByIssue, EIssueType} from "../git/branch";

export async function issueFlowInit(issuetype:EIssueType) {
  let issueList: IIssueList = await listIssues();
  let issues = issueList.issues.filter((e)=>{
    return e.fields.issuetype.name === issuetype
  });
  let issueSummeryList: string[] = issues.map((issue) => {
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
  let selectedIssue: IIssue = issues[selectedIssueIndex];

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