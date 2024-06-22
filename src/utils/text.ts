import { getConfiguration } from "./configuration";

export function trimNewLines(str: string, delimeter?: string) {
  const stringParts = str.split("\n");
  if (stringParts.length === 0) {
    return str;
  }

  let formattedStrings = stringParts.map((part) => part.trimStart());

  if (delimeter) {
    console.log("delimeter", delimeter);
    formattedStrings = formattedStrings.map((str) => `${delimeter} ${str}`);
  }

  return formattedStrings.join("\n");
}

export function isValidApiKey() {
  const configuration = getConfiguration();
  const apiKey = configuration.openAI.apiKey ?? "";
  const customEndpoint = configuration.openAI.customEndpoint?.toLowerCase();

  const isValidPrefix = customEndpoint === "perplexity" ?
    apiKey.startsWith("pplx-") : apiKey.startsWith("sk-");

  return (
    apiKey !== null &&
    apiKey !== undefined &&
    apiKey.trim().length > 0 &&
    isValidPrefix
  );
}
