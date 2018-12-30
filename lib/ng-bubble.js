#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
let cors = require('cors');
let tcpPortUsed = require('tcp-port-used');
let express = require('express');
const fs = require('fs');
let contentDisposition = require('content-disposition');
let url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
let scan = require('./scan');
let writeTemplate = require('./template');
let folders = [], files = [];
// let ngBubbleData = JSON.parse(fs.readdirSync('./ng-bubble.json'));
/*find the project*/
// Parse command line options
let program = require('commander');
program
    // .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
    .option('--ctrl <ctrl>', 'Enable click ctrl press along with doubleclick')
    .option('--ide <ide>', 'ide to enable. defaults to VS code')
    .parse(process.argv);
let port = program.port || 11637;
let ctrl = program.ctrl || 'n';
let ide = program.ide || 'vscode';
if (!(ctrl === 'y' || ctrl === 'yes' || ctrl === 'n' || ctrl === 'no')) {
    // throw "ctrl can only have: y, yes, n, no";
    console.log("ERROR: ctrl can only have: y, yes, n, no");
    throw "error"; //todo
}
ctrl = ctrl === 'y' || ctrl === 'yes';
// Scan the directory in which the script was called. It will
// add the 'files/' prefix to all files and folders, so that
// download links point to our /files route
let root = process.cwd();
// let tree = scan('.', root);
let tree = scan(root, "");
// console.log(tree);
// Ceate a new express app
let app = express();
app.use(cors());
// Serve static files from the public folder
app.use('/', express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, '/../../public'));;
app.get('/scan', function (req, res) {
    res.send(tree);
});
app.get('/search', function (req, res) {
    files = [];
    folders = [];
    let url_parts = url.parse(req.url, true);
    let file = url_parts.query.file.toLowerCase();
    let pathToBeOpened;
    let searchTerm = file; //file.replace('app-', '');
    try {
        let foundItems = searchData(tree.items, searchTerm);
        // if (!(foundItems && foundItems.files && foundItems.files.length > 0)) throw new Error('"no matching files found"');
        // let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
        // pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
        // openInIde(pathToBeOpened);
        res.status(200).json(foundItems);
    }
    catch (e) {
        console.error(e);
        res.status(422).send(e);
    }
});
app.get('/open', (req, res) => __awaiter(this, void 0, void 0, function* () {
    files = [];
    folders = [];
    let pathToBeOpened;
    let url_parts = url.parse(req.url, true);
    pathToBeOpened = url_parts.query.path;
    let editor = url_parts.query.editor;
    if (!pathToBeOpened) {
        /*if there is no path, get filename and create path*/
        let file = url_parts.query.file.toLowerCase();
        let isExactSearch = url_parts.query.file.exact;
        let searchTerm = isExactSearch ? file : file.replace('app-', '');
        let foundItems = searchData(tree.items, searchTerm);
        if (!(foundItems && foundItems.files && foundItems.files.length > 0))
            throw new Error('"no matching files found"');
        let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
        pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
    }
    try {
        yield openInIde(pathToBeOpened, editor);
        res.status(200).json("ng-bubble: success");
    }
    catch (e) {
        console.error(e);
        res.status(422).send(e);
    }
}));
function exactMatchedFileIndex(foundItems, searchTerm) {
    // {folders: folders, files: files}
    let angularSuffix = '.component.html';
    let ionicSuffix = '.page.html';
    return foundItems.files.findIndex((file) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}
// function findPathByFileName(fileName: string) {
//     let absolutePathsOfAllHtmlFilesInProvidedDir = htmlsDebug.split(',');
//     // let fileName = this.constructor.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1.').toLowerCase();
//     let fileNameDelimitedArr = fileName.toLowerCase().split('-');
//     fileName =
//         fileNameDelimitedArr.slice(0, fileNameDelimitedArr.length).join('-') + '.component.html';
//     fileName = fileName.replace('app-', '');
//     return absolutePathsOfAllHtmlFilesInProvidedDir.find((name:string) => name.includes(fileName));
// }
function openInIde(path, editor) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("opening file:", path);
        let ideCmd, currentIde;
        currentIde = editor ? editor : ide;
        ideCmd = currentIde === 'ws' || currentIde === 'webstorm' ? 'webstorm.exe' : 'code -r';
        yield exec(`${ideCmd} ${path}`);
    });
}
function searchData(data, searchTerms) {
    for (let d of data) {
        if (d.type === 'folder') {
            searchData(d.items, searchTerms);
            if (d.name.toLowerCase().match(searchTerms)) {
                folders.push(d);
            }
        }
        else if (d.type === 'file') {
            if (d.name.toLowerCase().match(searchTerms)) {
                files.push(d);
            }
        }
    }
    return { folders: folders, files: files };
}
function runAppOnFreePort() {
    return __awaiter(this, void 0, void 0, function* () {
        let inUse = yield tcpPortUsed.check(port, '127.0.0.1');
        while (inUse) {
            console.log(`Port ${port} is in use, trying ${port + 1}`);
            inUse = yield tcpPortUsed.check(++port, '127.0.0.1');
        }
        writeTemplate(port, ctrl);
        app.listen(port, function () {
            console.log('ng-bubble is Running on port ' + port);
            console.log("Please make sure to add following script into your index.html");
            console.log(`
        <script async src="http://localhost:${port}/assets/js/client.js"></script>
    `);
        });
    });
}
runAppOnFreePort();
//# sourceMappingURL=ng-bubble.js.map