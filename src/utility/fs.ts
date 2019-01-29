const util = require('util');
const readFile = util.promisify(require('fs').readFile);

export async function readFileAsync(path:string){
  let data =  await readFile(path);
  if(data){
    return JSON.parse(data.toString());
  }
}