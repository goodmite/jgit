import {runCommand} from "../utility/misc";
import {IIssue} from "../../interfaces";

export enum EIssueType {
  Bug = "Bug",
  Story = "Story",
}

export async function createBranchByIssue(data: IIssue) {
  let key = data.key;
  let issuetype_name = data.fields.issuetype.name;
  let fields_summary = data.fields.summary;

  let branchName = `${key}#${issuetype_name}##${fields_summary}`;
  branchName = branchName.split(' ').join('-');
  let cmd = `git branch "${branchName}"`;
  await (runCommand(cmd));
  return branchName;
}


export function checkoutBranch(branch: string) {
  return runCommand(`git checkout "${branch}"`);
}
