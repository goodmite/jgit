import {ask} from "./inquirerer";
import {questions} from "./questions";
import {EActions} from "../enums";
import {issueFlowInit} from "./flows/issue";
import {commitFlowInit} from "./flows/commit";


async function appInit() {

  // if(process.argv.length>3){
  //   console.log('Only one argument allowed');
  // }
  // answer = process.argv[2]

  /*parse arguments from user*/
  // let answer = (await ask(questions['start'])).name;
  let answer: any = EActions.Story;
  if (answer === EActions.BugFixes || answer === EActions.Story) {
    let issues = issueFlowInit(answer);
  }
  // else if (answer === EActions.Story) {
  //   let issues = issueFlowInit();
  // }
  // else if (answer === EActions.Refactor) {
  //   let issues = issueFlowInit();
  // }
  if (answer === EActions.Commit) {
    commitFlowInit();
  }


}

appInit();