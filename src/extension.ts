import * as vscode from "vscode";
import * as moment from "moment";
import * as fs from 'fs-extra';
import untildify = require('untildify');

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.openJunkDir", async () => {

    let rootDir = vscode.workspace.getConfiguration("openJunkDir").get<string>("junkFileDir");
    let fileDirFormat = vscode.workspace
      .getConfiguration("openJunkDir")
      .get<string>("junkFileFormat");

    let dir = await vscode.window.showInputBox({
      prompt: "Directory Name"
    })
    let junkDir = untildify(rootDir + moment().format(fileDirFormat) + "_" + dir)

    if (!fs.existsSync(junkDir)) {
      fs.mkdirsSync(junkDir)
    }

    let file = await vscode.window.showInputBox({
      prompt: "File Name",
    })

    let uri = vscode.Uri.parse("untitled:" + junkDir + "/" + file)

    vscode.workspace.openTextDocument(uri).then((text) => {
      vscode.window.showTextDocument(text, vscode.ViewColumn.One)
    })
    console.log("open:" + junkDir)
  });

  context.subscriptions.push(disposable);
}
