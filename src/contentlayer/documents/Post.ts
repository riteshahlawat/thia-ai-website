import { defineDocumentType, defineNestedType } from 'contentlayer/source-files';
import readingTime from 'reading-time';

const RelatedPost = defineNestedType(() => ({
    name: 'RelatedPost',
    fields: { slug: { type: 'string', required: true } },
}));

const CoverImage = defineNestedType(() => ({
    name: 'CoverImage',
    fields: {
        url: { type: 'string', required: true },
        alt: { type: 'string', required: true },
        title: { type: 'string', required: true },
        width: { type: 'number', required: true },
        height: { type: 'number', required: true },
    },
}));

const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        name: { type: 'string', required: true },
        position: { type: 'string', required: true },
        handle: { type: 'string', required: true },
        link: { type: 'string', required: true },
        avatar: { type: 'string', required: false },
    },
}));

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: 'blog/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'The title of the blog',
            required: true,
        },
        date: { type: 'date', required: true },
        description: {
            type: 'string',
            description: 'description excerpt of the post',
            required: true,
        },
        coverImage: {
            type: 'nested',
            of: CoverImage,
            required: true,
        },
        author: {
            type: 'nested',
            of: Author,
            required: true,
        },
    },
    computedFields: {
        readingTime: { type: 'json', resolve: post => readingTime(post.body.raw) },
        url: { type: 'string', resolve: post => post._raw.flattenedPath },
        // last_edited: { type: 'date', resolve: getLastEditedDate },
    },
}));
