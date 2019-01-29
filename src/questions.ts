import {EActions} from "../enums";

export const questions = {
  start: {
    message: "What do you want to do?",
    name: "name",
    choices: [EActions.UserStory, EActions.BugFixes, EActions.Refactor, EActions.Commit],
    type: "list"
  }

};