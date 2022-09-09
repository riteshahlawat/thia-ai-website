import { makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkMdxImages } from 'remark-mdx-images';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeExternalLinks from 'rehype-external-links';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import * as documentTypes from './src/contentlayer/documents';

const contentLayerConfig = makeSource({
    contentDirPath: 'content',
    documentTypes,
    mdx: {
        remarkPlugins: [remarkGfm, remarkMdxImages, remarkMath],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
            [rehypeExternalLinks, { target: '_blank' }],
            rehypeHighlight,
            rehypeKatex,
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
