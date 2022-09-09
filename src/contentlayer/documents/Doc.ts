import { defineDocumentType } from 'contentlayer/source-files';
import readingTime from 'reading-time';

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: 'docs/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        showChildCards: { type: 'boolean', required: false },
        // createdAt: { type: 'date', required: true },
        // updatedAt: { type: 'date', required: true },
        // isVisible: { type: 'boolean', required: true },
        // category: { type: 'string', required: true },
    },
    computedFields: {
        readingTime: { type: 'json', resolve: doc => readingTime(doc.body.raw) },
        slug: {
            type: 'string',
            resolve: doc =>
                doc._raw.flattenedPath
                    .split('/')
                    .splice(1)
                    .map(s => s.split('-').splice(1).join('-'))
                    .join('/'),
        },
        pathSegments: {
            type: 'json',
            resolve: doc => {
                const path = doc._raw.flattenedPath.split('/');
                const pathSegment = path.splice(1).map(s => {
                    return {
                        order: parseInt(s.split('-', 1)[0]),
                        pathName: s.split('-').slice(1).join('-'),
                    };
                });
                return pathSegment;
            },
        },
    },
}));
