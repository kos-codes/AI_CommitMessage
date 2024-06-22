![header](https://capsule-render.vercel.app/api?type=venom&height=200&color=0:EEFF00,100:a82da8&fontColor=0:EEFF00,100:a82da8&text=ACM&desc=AI%20Commit%20Message&descAlignY=70)

# 🚀 AI Commit Message - Say Goodbye to Commit Message Struggles! 🤖✨

Welcome to the **AI Commit Message** extension for VS Code - your ultimate companion for crafting perfect commit messages effortlessly! 📝💡 Harness the power of artificial intelligence to generate compelling and informative commit messages that accurately describe your code changes. 🧠💬

## 🌟 Features

- 🎨 **Seamless Generation**: Generate commit messages with a single click on the 'Generate AI commit' button in the source control tab.

![Example of usage](assets/images/example.gif)

> 💡 Tip: You can also generate commits from the command palette by calling the 'Generate AI commit' command.

- ⚙️ **Customizable Settings**: Tailor the extension to your preferences with a range of configurable settings.
- 🎭 **Appearance**: Customize the delimiter between commit lines.
- 🌐 **General**: Choose your preferred generator (ChatGPT) and message approval method (Quick pick or Message file).
- 🔑 **OpenAI**: Configure your OpenAI API key, GPT version, custom endpoint, temperature, and max tokens.

## 📋 Requirements

To unleash the full potential of AI Commit Message, you'll need an OpenAI API Key. Get yours from [OpenAI](https://platform.openai.com/account/api-keys) and let the magic begin! 🔑✨

## 🎨 Extension Settings

AI Commit Message offers a range of settings to customize your experience:

### Appearance 🎭

- `gptcommit.appearance.delimeter`: Delimiter between commit lines.

### General 🌐

- `gptcommit.general.generator`: Generator used to create commit messages. Available options: ChatGPT.
- `gptcommit.general.messageApproveMethod`: Method used to approve generated commit messages. Available options: Quick pick, Message file.

### OpenAI 🔑

- `gptcommit.openAI.apiKey`: OpenAI API Key. Required for generating AI commit messages.
- `gptcommit.openAI.gptVersion`: Version of GPT used by OpenAI.
- `gptcommit.openAI.customEndpoint`: Enter "openai", "perplexity", or a custom endpoint URL.
- `gptcommit.openAI.temperature`: Controls randomness. Lower values result in less random completions.
- `gptcommit.openAI.maxTokens`: The maximum number of tokens to generate (up to 2048 tokens shared between prompt and completion).

## 📝 Release Notes

### 1.0.5

- Added advanced configuration for ChatGPT.
- Introduced option to accept and edit generated commits via temp message file. (Thanks, [chenweiyi](https://github.com/chenweiyi)!)
- Added option to set custom ChatGPT endpoint URL. (Thanks, [aiyogg](https://github.com/aiyogg)!)
- Fixed issue with git on Windows (Issue [#5](https://github.com/dmytrobaida/GPTCommitVSCode/issues/5)).
- Added option to select different ChatGPT versions (Issue [#6](https://github.com/dmytrobaida/GPTCommitVSCode/issues/6)).
- Set default ChatGPT version to gpt-4.

### 1.0.4

- Updated commit formatting.
- Added new setting.

### 1.0.3

- Added OpenAI API Key input prompt.

### 1.0.2

- Fixed UX.

### 1.0.1

- Updated icons.

### 1.0.0

- Initial release of AI Commit Message.

## 📜 License

Released under [MIT](/LICENSE) by [@dmytrobaida](https://github.com/dmytrobaida).

---

Elevate your commit game to new heights with AI Commit Message! Let's make commit messages great again! 🚀🌟
