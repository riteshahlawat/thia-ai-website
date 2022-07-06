import { Doc } from 'contentlayer/generated';
import { ReadTimeResults } from 'reading-time';

export type PathSegment = { order: number; pathName: string };

export type BreadcrumbType = { path: string };

export type DocPageType = {
    doc: Doc;
    tree: TreeNode[];
    childrenTree: TreeNode[];
    breadcrumbs: BreadcrumbType;
};

// Docs Tree Types
export type TreeNode = {
    title: string;
    slug: string;
    path: string;
    description: string;
    readTime: ReadTimeResults;
    children: TreeNode[];
};

export type TreeType = {
    tree: TreeNode[];
    depth: number;
    activePath: string;
};

export type BranchType = {
    branch: TreeNode;
    depth: number;
    activePath: string;
};
