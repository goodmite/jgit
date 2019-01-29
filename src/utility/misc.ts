import * as util from 'util';
const exec = util.promisify(require('child_process').exec);
export function clone(obj:object) {
  return JSON.parse(JSON.stringify(obj));
}

export async function runCommand(cmd:string) {
  let data = (await exec(cmd));
  console.log(data.stdout);
  return data;
}