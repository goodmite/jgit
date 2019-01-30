import {readFileAsync} from "../utility/fs";
import {join} from "path";

const JiraApi = require('jira-client');
const jira = new JiraApi({
  protocol: 'https',
  host: 'jira.imimobile.com',
  username: 'sandeepkumar.g',
  password: 'Dec@2018',
  apiVersion: '2',
  strictSSL: true
});

export async function listIssues() {

  // return readFileAsync(join(__dirname, '/../../../issues.json'));

  let x = await jira.getUsersIssues('sandeepkumar.g', false);
  return x;
}