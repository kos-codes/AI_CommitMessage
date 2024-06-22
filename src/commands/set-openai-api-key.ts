// located at : src/commands/set-openai-api-key.ts
import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { isValidApiKey, trimNewLines } from "@utils/text";
import { logToOutputChannel } from "@utils/output";

export async function setOpenaiApiKey() {
  logToOutputChannel("Starting setOpenaiApiKey command");

  let customEndpoint: string | undefined;
  const customEndpoints = [
    "openai",
    "perplexity",
    "HTTP URL",
  ];
  do {
    let selectedEndpoint = await vscode.window.showQuickPick(
      customEndpoints,
      {
        placeHolder: 'Select the Endpoint for AI.',
        ignoreFocusOut: true
      }
    );

    if (selectedEndpoint === undefined) {
      logToOutputChannel("User cancelled the operation.");
      vscode.window.showInformationMessage("Operation cancelled.");
      return;
    }

    if (selectedEndpoint === "HTTP URL") {
      customEndpoint = await vscode.window.showInputBox({
        prompt: "Enter your Custom HTTP URL for OpenAI",
        ignoreFocusOut: true,
        placeHolder: "http://your-custom-api.com"
      });

      if (!customEndpoint || trimNewLines(customEndpoint).length === 0 || !customEndpoint.startsWith("http")) {
        vscode.window.showErrorMessage("Valid HTTP URL is required. Please enter a valid URL or press ESC to cancel.");
        customEndpoint = undefined;
      }
    } else {
      customEndpoint = selectedEndpoint;
    }

  } while (!customEndpoint);

  let gptVersion: string | undefined;
  const gptVersionOptions = customEndpoint.toLowerCase() === 'perplexity' ? [
    "llama-3-sonar-small-32k-chat",
    "llama-3-sonar-small-32k-online",
    "llama-3-sonar-large-32k-chat",
    "llama-3-sonar-large-32k-online",
    "llama-3-8b-instruct",
    "llama-3-70b-instruct",
    "mixtral-8x7b-instruct"
  ] : [
    "gpt-4o",
    "gpt-4o-2024-05-13",
    "gpt-4-turbo",
    "gpt-4-turbo-2024-04-09",
    "gpt-4-turbo-preview",
    "gpt-4-0125-preview",
    "gpt-4-1106-preview",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-1106",
  ];

  do {

    gptVersion = await vscode.window.showQuickPick(
      gptVersionOptions,
      {
        placeHolder: 'Select the GPT version.',
        ignoreFocusOut: true
      }
    );

    if (gptVersion === undefined) {
      logToOutputChannel("User cancelled the operation.");
      vscode.window.showInformationMessage("Operation cancelled.");
      return;
    }

    if (!gptVersion || trimNewLines(gptVersion).length === 0) {
      vscode.window.showErrorMessage("GPT Version is required. Please select a valid GPT version or press ESC to cancel.");
    }
  } while (!gptVersion || trimNewLines(gptVersion).length === 0);

  let apiKey: string | undefined;
  const expectedPrefix = customEndpoint.toLowerCase() === "perplexity" ? "pplx-" : "sk-";
  do {
    apiKey = await vscode.window.showInputBox({
      prompt: `Enter your OpenAI API Key that matches your endpoint (${customEndpoint}) and GPT version. It should start with '${expectedPrefix}'.`,
      ignoreFocusOut: true,
      placeHolder: `Starts with '${expectedPrefix}' depending on the endpoint`
    });

    if (apiKey === undefined) {
      logToOutputChannel("User cancelled the operation.");
      vscode.window.showInformationMessage("Operation cancelled.");
      return;
    }

    if (!apiKey || trimNewLines(apiKey).length === 0 || !apiKey.startsWith(expectedPrefix)) {
      vscode.window.showErrorMessage(`API Key must start with '${expectedPrefix}'. Please enter a valid API key or press ESC to cancel.`);
    }
  } while (!apiKey || trimNewLines(apiKey).length === 0 || !apiKey.startsWith(expectedPrefix));

  let language: string | undefined;
  const languageOptions = [
    "English",
    "Korean",
    "Japanese",
    "Chinese",
    "Spanish",
    "Arabic",
    "Portuguese",
    "Russian",
    "French",
    "German",
    "Italian"
  ];
  do {
    language = await vscode.window.showQuickPick(
      languageOptions,
      {
        placeHolder: 'English, Korean, Japanese, etc.',
        ignoreFocusOut: true
      }
    );

    if (language === undefined) {
      logToOutputChannel("User cancelled the operation.");
      vscode.window.showInformationMessage("Operation cancelled.");
      return;
    }

    if (!language || trimNewLines(language).length === 0) {
      vscode.window.showErrorMessage("language is required. Please select a valid language or press ESC to cancel.");
    }
  } while (!language || trimNewLines(language).length === 0);

  await setConfigurationValue("openAI.customEndpoint", customEndpoint);
  await setConfigurationValue("openAI.gptVersion", gptVersion);
  await setConfigurationValue("openAI.apiKey", apiKey);
  await setConfigurationValue("openAI.language", language);

  logToOutputChannel("OpenAI configuration updated successfully.");
  vscode.window.showInformationMessage("OpenAI API Key and configuration saved successfully.");
}
