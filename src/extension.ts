import * as vscode from "vscode";
import * as moment from "moment";
import * as fs from 'fs-extra';
import untildify = require('untildify');

export function activate(context: vscode.ExtensionContext) {
  const { commands, workspace, window } = vscode;
  let disposable = commands.registerCommand("extension.openJunkDir", async () => {

    let rootDir = workspace.getConfiguration("openJunkDir").get<string>("junkFileDir");
    let fileDirFormat = vscode.workspace
      .getConfiguration("openJunkDir")
      .get<string>("junkFileFormat");

    let dir = await window.showInputBox({
      prompt: "Directory Name"
    })
    let junkDir = untildify(rootDir + moment().format(fileDirFormat) + "_" + dir)

    if (!fs.existsSync(junkDir)) {
      fs.mkdirsSync(junkDir)
    }

    let file = await window.showInputBox({
      prompt: "File Name",
    })

    let uri = vscode.Uri.parse("untitled:" + junkDir + "/" + file)

    workspace.openTextDocument(uri).then((text) => {
      window.showTextDocument(text, vscode.ViewColumn.One)
    })
  });

  context.subscriptions.push(disposable);
}
