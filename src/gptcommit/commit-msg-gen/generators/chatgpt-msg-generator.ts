/*
 * This code includes portions of code from the opencommit project, which is
 * licensed under the MIT License. Copyright (c) Dima Sukharev.
 * The original code can be found at https://github.com/di-sukharev/opencommit/blob/master/src/generateCommitMessageFromGitDiff.ts.
 */
import OpenAI from "openai";

import { trimNewLines } from "@utils/text";
import { Configuration as AppConfiguration } from "@utils/configuration";

import { MsgGenerator } from "./msg-generator";
import { ChatCompletionMessageParam } from "openai/resources";
import { logToOutputChannel } from "@utils/output";

const initMessagesPrompt: ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content: `You are to act as the author of a commit message in git. Your job is to create clean and comprehensive commit messages according to the airbnb commitlint rules. I'll send you an output of 'git diff --staged' command, and you convert it into a commit message. Do not preface the commit with anything, use the present tense. Don't add any descriptions to the commit, only commit message. Use english language to answer.`,
  },
  {
    role: 'user',
    content: `diff --git a/src/server.ts b/src/server.ts
    index ad4db42..f3b18a9 100644
    --- a/src/server.ts
    +++ b/src/server.ts
    @@ -10,7 +10,7 @@ import {
      initWinstonLogger();
      
      const app = express();
    -const port = 7799;
    +const PORT = 7799;
      
      app.use(express.json());
      
    @@ -34,6 +34,6 @@ app.use((_, res, next) => {
      // ROUTES
      app.use(PROTECTED_ROUTER_URL, protectedRouter);
      
    -app.listen(port, () => {
    -  console.log(\`Server listening on port \${port}\`);
    +app.listen(process.env.PORT || PORT, () => {
    +  console.log(\`Server listening on port \${PORT}\`);
      });`,
  },
  {
    role: 'assistant',
    content: `fix(server.ts): change port variable case from lowercase port to uppercase PORT
        feat(server.ts): add support for process.env.PORT environment variable`,
  },
];

function generateCommitMessageChatCompletionPrompt(
  diff: string
): ChatCompletionMessageParam[] {
  const chatContextAsCompletionRequest = [...initMessagesPrompt];

  chatContextAsCompletionRequest.push({
    role: 'user',
    content: diff,
  });

  return chatContextAsCompletionRequest;
}

const defaultModel = "gpt-4o";
const defaultTemperature = 0.8;
const defaultMaxTokens = 196;

export class ChatgptMsgGenerator implements MsgGenerator {
  openAI: OpenAI;
  config?: AppConfiguration["openAI"];

  constructor(config: AppConfiguration["openAI"]) {
    let baseURL: string | undefined;
    if (config.customEndpoint) {
      const endpoint = config.customEndpoint.toLowerCase().trim();
      if (endpoint === "perplexity") {
        baseURL = "https://api.perplexity.ai";
      } else if (endpoint.startsWith("http")) {
        baseURL = endpoint;
      } else {
        baseURL = undefined;
      }
    }

    this.openAI = new OpenAI({
      baseURL: baseURL,
      apiKey: config.apiKey
    });

    this.config = config;
  }

  async generate(diff: string, delimeter?: string) {
    const messages = generateCommitMessageChatCompletionPrompt(diff);
    const data = await this.openAI.chat.completions.create({
      model: this.config?.gptVersion || defaultModel,
      messages: messages,
      temperature: this.config?.temperature || defaultTemperature,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_tokens: this.config?.maxTokens || defaultMaxTokens,
    });

    const message = data?.choices[0].message;
    const commitMessage = message?.content;

    logToOutputChannel("[customEndpoint] ", this.config?.customEndpoint);
    logToOutputChannel("[model]", this.config?.gptVersion);
    logToOutputChannel("[Data_completion_tokens]", data.usage?.completion_tokens.toFixed(0));
    logToOutputChannel("[Data_prompt_tokens]", data.usage?.prompt_tokens.toFixed(0));
    logToOutputChannel("[Data_total_tokens]", data.usage?.total_tokens.toFixed(0));

    if (!commitMessage) {
      throw new Error("No commit message were generated. Try again.");
    }

    const alignedCommitMessage = trimNewLines(commitMessage, delimeter);
    return alignedCommitMessage;
  }
}
