import { defineDocumentType } from 'contentlayer/source-files';

export const Changelog = defineDocumentType(() => ({
    name: 'Changelog',
    filePathPattern: 'changelog/**/*.mdx',
    contentType: 'mdx',
    fields: {
        version: { type: 'string', required: true, description: 'Release Version' },
        createdAt: { type: 'date', required: true },
    },
}));
