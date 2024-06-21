import { MsgGenerator } from "@gptcommit/commit-msg-gen/generators/msg-generator";
import { DiffProvider } from "@gptcommit/scm/diff-providers/diff-provider";
import { CommitMessageWriter } from "@gptcommit/scm/commit-message-writers/commit-message-writer";

import { Flow } from "./flow";

type GenerateCompletionFlowProps = {
  delimeter?: string;
};

export class GenerateCompletionFlow
  implements Flow<GenerateCompletionFlowProps> {
  constructor(
    private readonly msgGenerator: MsgGenerator,
    private readonly diffProvider: DiffProvider,
    private readonly commitMessageWriter: CommitMessageWriter,
  ) { }

  activate(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async run(props: GenerateCompletionFlowProps): Promise<void> {
    let diff = await this.diffProvider.getStagedDiff();

    if (!diff || diff.trim() === "") {
      diff = await this.diffProvider.getDiff();
    }
    
    if (!diff || diff.trim() === "") {
      throw new Error("No diff found. Try again.");
    }

    const commitMessage = await this.msgGenerator.generate(
      diff,
      props.delimeter
    );

    if (!commitMessage) {
      throw new Error("No commit message were generated. Try again.");
    }

    await this.commitMessageWriter.write(commitMessage);
  }
}
