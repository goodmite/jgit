"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
exports.questions = {
    start: {
        message: "What do you want to do?",
        name: "name",
        choices: [enums_1.EActions.UserStory, enums_1.EActions.BugFixes, enums_1.EActions.Refactor, enums_1.EActions.Commit],
        type: "list"
    }
};
//# sourceMappingURL=questions.js.map