import * as vscode from "vscode";
import * as dayjs from "dayjs";
import * as fs from "fs";
import mkdirp = require("mkdirp");
import untildify = require("untildify");

export function activate(context: vscode.ExtensionContext) {
  const { commands, workspace, window } = vscode;
  let disposable = commands.registerCommand(
    "extension.openJunkDir",
    async () => {
      const rootDir = workspace
        .getConfiguration("openJunkDir")
        .get<string>("junkFileDir");
      const fileDirFormat = vscode.workspace
        .getConfiguration("openJunkDir")
        .get<string>("junkFileFormat");

      const dir = await window.showInputBox({
        prompt: "Directory Name",
      });
      let junkDir = untildify(
        rootDir + dayjs().format(fileDirFormat) + "_" + dir
      );

      if (!fs.existsSync(junkDir)) {
        mkdirp(junkDir).catch((err) => console.log(err));
      }

      const file = await window.showInputBox({
        prompt: "File Name",
      });

      const uri = vscode.Uri.parse(`untitled:${junkDir}/${file}`);

      workspace.openTextDocument(uri).then((text) => {
        window.showTextDocument(text, vscode.ViewColumn.One);
      });
    }
  );

  context.subscriptions.push(disposable);
}
