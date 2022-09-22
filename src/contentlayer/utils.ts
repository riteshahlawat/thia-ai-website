import type { DocumentGen } from 'contentlayer/core';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import readingTime from 'reading-time';

export const contentDirPath = 'content';

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
    const stats = await fs.stat(path.join(contentDirPath, doc._raw.sourceFilePath));
    return stats.mtime;
};
