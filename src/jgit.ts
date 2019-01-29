import {ask} from "./inquirerer";
import {questions} from "./questions";
import {EActions} from "../enums";
import {issueFlowInit} from "./flows/issue";


async function appInit() {
  /*parse arguments from user*/
  // let answer = (await ask(questions['start'])).name;
  let answer = EActions.BugFixes;
  if(answer === EActions.BugFixes){
    let issues = issueFlowInit();

  }else if(answer === EActions.UserStory){

  }else if(answer === EActions.Refactor){

  }if(answer === EActions.Commit){

  }


}

appInit();