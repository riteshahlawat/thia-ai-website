import { PathSegment } from 'src/types/PathSegment';
import { Doc } from '../../../.contentlayer/generated';

export const buildDocsTree = (docs: Doc[], parentPathNames: string[] = []): any => {
    const level = parentPathNames.length;
    return docs
        .filter(
            (d: any) =>
                d.pathSegments.length === level + 1 &&
                d.pathSegments
                    .map((_: PathSegment) => _.pathName)
                    .join('/')
                    .startsWith(parentPathNames.join('/'))
        )
        .map((doc: Doc) => ({
            title: doc.title,
            slug: doc.slug,
            description: doc.description,
            readTime: doc.readingTime,
            children: buildDocsTree(
                docs,
                doc.pathSegments.map((_: PathSegment) => _.pathName)
            ),
        }));
};
