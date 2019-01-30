import {runCommand} from "../utility/misc";
import {IIssue} from "../../interfaces";
import {accessSync} from "fs";

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

export async function getCurrentBranchName() {
  let branch =  (await runCommand('git rev-parse --abbrev-ref HEAD')).stdout;
  return branch && branch.trim();
}

export function parseBranchName(name:string) {
  /*todo: use regex to check if branch name is correct format*/
  let arr =  name.split('##');
  let code = arr[0].split('#')[0];
  let type = arr[0].split('#')[1];
  let summery = arr[1];
  return{
    code,
    type,
    summery
  }
}