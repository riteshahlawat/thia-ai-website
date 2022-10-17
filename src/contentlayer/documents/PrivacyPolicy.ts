import { defineDocumentType } from 'contentlayer/source-files';

export const PrivacyPolicy = defineDocumentType(() => ({
    name: 'PrivacyPolicy',
    filePathPattern: 'privacy-policy/**/*.mdx',
    contentType: 'mdx',
    fields: {
        lastUpdatedAt: { type: 'date', required: true, description: 'The date the policy was last updated' },
    },
}));
