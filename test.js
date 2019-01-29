// import JiraApi from 'jira-client';
var JiraApi = require('jira-client');
// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: 'jira.imimobile.com',
  username: 'sandeepkumar.g',
  password: 'Dec@2018',
  apiVersion: '2',
  strictSSL: true
});


jira.getUsersIssues('sandeepkumar.g', false)
.then((val)=>{
  console.log(val);
});