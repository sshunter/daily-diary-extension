// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('daily-diary-extension.openDiaryEntry', function () {
		    const today = new Date();
        const formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
        const filePath = path.join(os.homedir(), 'Documents', 'diary', `${formattedDate}.md`);

				var created = false;
				if (!fs.existsSync(filePath)) {
					fs.writeFileSync(filePath, '', 'utf8');
					created = true;
				}

				const uriPath = vscode.Uri.file(filePath);
        vscode.workspace.openTextDocument(uriPath).then((doc) => {
            vscode.window.showTextDocument(doc);
        });

				if (created) {
					vscode.window.showInformationMessage('New diary file created: ' + filePath);
				} else {
					vscode.window.showInformationMessage('Opened diary file: ' + filePath);
				}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
