import { TreeNode, PathSegment } from 'src/types/DocsTypes';
import { Doc } from '../../../.contentlayer/generated';

export const buildDocsTree = (docs: Doc[], parentPathNames: string[] = []): TreeNode[] => {
    const level = parentPathNames.length;
    return docs
        .filter(
            (d: Doc) =>
                d.pathSegments.length === level + 1 &&
                d.pathSegments
                    .map((_: PathSegment) => _.pathName)
                    .join('/')
                    .startsWith(parentPathNames.join('/'))
        )
        .sort((a: Doc, b: Doc) => a.pathSegments[level].order - b.pathSegments[level].order)
        .map(
            (doc: Doc): TreeNode => ({
                title: doc.title,
                slug: doc.slug,
                description: doc.description,
                readTime: doc.readingTime,
                children: buildDocsTree(
                    docs,
                    doc.pathSegments.map((_: PathSegment) => _.pathName)
                ),
            })
        );
};
