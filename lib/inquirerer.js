"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
function askList(data) {
    return inquirer.prompt([data]);
}
exports.askList = askList;
// export function askInput() {
//   return inquirer.prompt([{
//     type: 'list',
//     message: 'What ide you want to use?',
//     name: 'ide',
//     choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
//   }]);
// }
//# sourceMappingURL=inquirerer.js.map