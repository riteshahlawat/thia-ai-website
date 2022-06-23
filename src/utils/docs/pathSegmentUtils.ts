import { Doc } from 'contentlayer/generated';
import { PathSegment } from '@/types/DocsTypes';

export const getPathSegments = (doc: Doc) => doc.pathSegments.map((_: PathSegment) => _.pathName);
export const joinPathSegments = (doc: Doc): string => getPathSegments(doc).join('/');
