import {getCurrentBranchName, parseBranchName} from "../git/branch";
import {EMainBranches} from "../../enums";
import {ask} from "../inquirerer";
import {runCommand} from "../utility/misc";

export async function commitFlowInit() {
  let currentBranch = await getCurrentBranchName();
  let {code, type, summery} = parseBranchName(currentBranch);
  if (currentBranch === EMainBranches.develop || currentBranch === EMainBranches.master || currentBranch === EMainBranches.staging) {
    console.log(`Error: commiting in ${currentBranch} is not allowed. Please fork; a branch.`);
    return;
  }
  let section = (await ask({
    message: 'What is the section affected by this commit?',
    type: 'input',
    choices: [],
  })).name;

  let message = (await ask({
    message: 'Please write a descriptive commit message.',
    type: 'input',
    choices: [],
  })).name;

  let commitMessage = `${type}#${code}##:${section}:${message}`;
  runCommand(`git commit -m "${commitMessage}"`);
}