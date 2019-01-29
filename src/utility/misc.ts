const exec = util.promisify(require('child_process').exec);
export function clone(obj:object) {
  return JSON.parse(JSON.stringify(obj));
}

export async function runCommand(cmd:string) {
  return exec(cmd);
}