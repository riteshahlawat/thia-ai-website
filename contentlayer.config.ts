import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files';

const computedFields: ComputedFields = {
    slug: {
        type: 'string',
        resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
};

const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: 'docs/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
    },
    computedFields,
}));

const contentLayerConfig = makeSource({
    contentDirPath: 'content',
    documentTypes: [Doc],
});

export default contentLayerConfig;
