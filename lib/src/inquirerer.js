"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
function ask(data) {
    return inquirer.prompt([Object.assign({}, data, { name: 'name' })]);
}
exports.ask = ask;
// export function askInput() {
//   return inquirer.prompt([{
//     type: 'list',
//     message: 'What ide you want to use?',
//     name: 'ide',
//     choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
//   }]);
// }
//# sourceMappingURL=inquirerer.js.map