import { Stats } from "fs";
import * as path from "path";

import * as Bluebird from "bluebird";
import * as fs from "fs";
const stat = Bluebird.promisify(fs.stat);

interface ExtendedStats extends Stats {
  path: string;
}

export default async function fileExists(
  filePath: string
): Promise<ExtendedStats> {
  let fileStats: Stats | null = null;
  try {
    fileStats = await stat(filePath);
  } catch (e) {}
  return fileStats ? Object.assign(fileStats, { path: filePath }) : null;
}
