const inquirer: any = require('inquirer');
export function ask(data:{message:string,choices:string[], type:string}) {
  return inquirer.prompt([{...data, name:name}]);
}

// export function askInput() {
//   return inquirer.prompt([{
//     type: 'list',
//     message: 'What ide you want to use?',
//     name: 'ide',
//     choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
//   }]);
// }