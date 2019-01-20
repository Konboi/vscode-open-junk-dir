// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as moment from "moment";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "open-junk-dir" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.openJunkDir",
    () => {
      // The code you place here will be executed every time your command is executed

      let rootDir = vscode.workspace
        .getConfiguration("openJunkDir")
        .get<string>("junkFileDir");

      let fileDirFormat = vscode.workspace
        .getConfiguration("openJunkDir")
        .get<string>("junkFileFormat");
      let fileDir = rootDir + moment().format(fileDirFormat);

      console.log(fileDir);
      // Display a message box to the user
      //vscode.window.showInformationMessage("rootDir:"+  rootDir + " " +  fileDir);
      vscode.window.showInformationMessage("Hello Open Junk Dir");

      //console.log(moment().format(fileDir));
      //console.log(moment().format('YYYY-MM-DD'))
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
