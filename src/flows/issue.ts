import {listIssues} from "../jira/issues";
import {IIssue} from "../../interfaces";
import {ask} from "../inquirerer";
import {createBranch} from "../git/branch";

export async function issueFlowInit() {
  let issues:IIssue[] = await listIssues();
  let issueSummeryList:string[] =  issues.map((issue)=>{
    let key = issue.key;
    let summary = issue.fields.summary;
    return `${key} - ${summary}`
  });

  let selectedIssueSummery:string = (await ask({
    message: 'Please select an issue:',
    choices: issueSummeryList,
    type: 'list'
  })).name;

  let selectedIssueIndex = issueSummeryList.findIndex(el => el === selectedIssueSummery);
  let selectedIssue:IIssue = issues[selectedIssueIndex];

  createBranch({fields_summary:selectedIssue.fields.summary, key:selectedIssue.key, issuetype_name:selectedIssue.fields.issuetype.name});
}