export interface DiffProvider {
  getStagedDiff: (excludeFiles?: string[]) => Promise<string>;
  getDiff: (excludeFiles?: string[]) => Promise<string>;
}
