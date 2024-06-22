import * as vscode from "vscode";

import { setConfigurationValue } from "@utils/configuration";
import { isValidApiKey, trimNewLines } from "@utils/text";
import { logToOutputChannel } from "@utils/output";

export async function setOpenaiApiKey() {
  logToOutputChannel("Starting setOpenaiApiKey command");

  let customEndpoint: string | undefined = "";
  do {
    customEndpoint = await vscode.window.showInputBox({
      prompt: "Enter your Custom Endpoint for OpenAI (e.g., 'openai', 'perplexity', or an HTTP URL)",
      ignoreFocusOut: true,
      placeHolder: "openai, perplexity, or http://your-custom-api.com"
    });

    if (!customEndpoint || trimNewLines(customEndpoint).length === 0) {
      vscode.window.showErrorMessage("Custom Endpoint is required. Please enter a valid endpoint or press ESC to cancel.");
    }
  } while (!customEndpoint || trimNewLines(customEndpoint).length === 0);

  const isPerplexity = customEndpoint.toLowerCase() === "perplexity";
  const gptVersionPrompt = isPerplexity ? "Enter 'llama-3-sonar-large-32k-chat' or 'llama-3-sonar-small-32k-chat'" : "Enter 'gpt-4o', 'gpt-4-turbo', or 'gpt-3.5-turbo'";
  let gptVersion: string | undefined = "";

  do {
    gptVersion = await vscode.window.showInputBox({
      prompt: gptVersionPrompt,
      ignoreFocusOut: true,
      placeHolder: isPerplexity ? "llama-3-sonar..." : "gpt-..."
    });

    if (!gptVersion || trimNewLines(gptVersion).length === 0) {
      vscode.window.showErrorMessage("GPT Version is required. Please enter a valid GPT version or press ESC to cancel.");
    }
  } while (!gptVersion || trimNewLines(gptVersion).length === 0);

  const expectedPrefix = customEndpoint.toLowerCase() === "perplexity" ? "pplx-" : "sk-";
  let apiKey: string | undefined = "";
  do {
    apiKey = await vscode.window.showInputBox({
      prompt: `Enter your OpenAI API Key that matches your endpoint (${customEndpoint}) and GPT version. It should start with '${expectedPrefix}'.`,
      ignoreFocusOut: true,
      placeHolder: `Starts with '${expectedPrefix}' depending on the endpoint`
    });

    if (!apiKey || trimNewLines(apiKey).length === 0 || !apiKey.startsWith(expectedPrefix)) {
      vscode.window.showErrorMessage(`API Key must start with '${expectedPrefix}'. Please enter a valid API key or press ESC to cancel.`);
    }
  } while (!apiKey || trimNewLines(apiKey).length === 0 || !apiKey.startsWith(expectedPrefix));

  await setConfigurationValue("openAI.customEndpoint", customEndpoint);
  await setConfigurationValue("openAI.gptVersion", gptVersion);
  await setConfigurationValue("openAI.apiKey", apiKey);

  logToOutputChannel("OpenAI configuration updated successfully.");
  vscode.window.showInformationMessage("OpenAI API Key and configuration saved successfully.");
}
