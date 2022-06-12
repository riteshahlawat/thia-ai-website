import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkMdxImages } from 'remark-mdx-images';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeExternalLinks from 'rehype-external-links';
import readingTime from 'reading-time';

const computedFields: ComputedFields = {
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
};

const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: 'docs/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        // createdAt: { type: 'date', required: true },
        // updatedAt: { type: 'date', required: true },
        // isVisible: { type: 'boolean', required: true },
        // category: { type: 'string', required: true },
    },
    computedFields,
}));

const contentLayerConfig = makeSource({
    contentDirPath: 'content',
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm, remarkMdxImages],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
            [rehypeExternalLinks, { target: '_blank' }],
            rehypeHighlight,
        ],
        esbuildOptions: options => {
            options.loader = {
                ...options.loader,
                '.png': 'dataurl',
                '.jpg': 'dataurl',
            };
            return options;
        },
    },
});

export default contentLayerConfig;
