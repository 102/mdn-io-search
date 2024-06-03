import * as vscode from "vscode";

const mdnUri = "https://mdn.io";

const openMdn = (term: string | undefined) => {
  if (!term) {
    return;
  }

  vscode.env.openExternal(vscode.Uri.parse(`${mdnUri}/${term}`));
};

export function activate(context: vscode.ExtensionContext) {
  let paletteSearch = vscode.commands.registerCommand(
    "mdn-io-search.search",
    async () => {
      const term = await vscode.window.showInputBox({
        placeHolder: "Input your search term",
      });

      openMdn(term);
    },
  );

  let contextMenuSearch = vscode.commands.registerCommand(
    "mdn-io-search.searchContext",
    async () => {
      const selection = vscode.window.activeTextEditor?.selection;
      if (selection) {
        // selection should always be present as this command has related `when` condition
        const range = new vscode.Range(
          selection?.start.line,
          selection?.start.character,
          selection?.end.line,
          selection?.end.character,
        );
        const term = vscode.window.activeTextEditor?.document.getText(range);

        openMdn(term);
      }
    },
  );

  context.subscriptions.push(paletteSearch);
  context.subscriptions.push(contextMenuSearch);
}

export function deactivate() {}
