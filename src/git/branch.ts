import {runCommand} from "../utility/misc";

export enum EIssueType {
  Bug="Bug",
  Story="Story",
}
export function createBranch(data:{issuetype_name:EIssueType, key:string, fields_summary:string}) {
  let {key,fields_summary,issuetype_name} = data;
  let branchName =  `${key}#${issuetype_name}##${fields_summary}`;
  let cmd = `git branch ${branchName}`;
  return runCommand(cmd);
}