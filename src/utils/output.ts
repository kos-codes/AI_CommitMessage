import * as vscode from "vscode";

const outputChannel = vscode.window.createOutputChannel("GPT Commit");

export function logToOutputChannel(message: string, customMessage?: string | undefined) {
  if (customMessage) {
    message = message.concat(` ${customMessage}`);
  }
  outputChannel.appendLine(`GPT Commit: ${message}`);
}
