import React from 'react';
import { UrlObject } from 'url';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface LinkObjType {
    [key: string]: {
        path: string | UrlObject;
        icon: React.ReactNode;
        label: string;
    };
}

export const links: { [key: string]: LinkObjType } = {
    landing: { index: { path: { pathname: '/' }, icon: null, label: 'Home' } },
    pricing: { index: { path: { pathname: '/pricing' }, icon: null, label: 'Pricing' } },
    download: { index: { path: { pathname: '/download' }, icon: null, label: 'Download' } },
    support: { index: { path: { pathname: '/support' }, icon: null, label: 'Support' } },
    docs: { index: { path: { pathname: '/docs' }, icon: null, label: 'Docs' } },
    changelog: { index: { path: { pathname: '/changelog' }, icon: null, label: 'Changelog' } },
};

export const socials: LinkObjType = {
    twitter: { path: 'https://twitter.com/thia_ai', icon: <FaTwitter />, label: 'Twitter' },
    linkedin: { path: '#', icon: <FaLinkedin />, label: 'LinkedIn' },
    github: { path: '#', icon: <FaGithub />, label: 'Github' },
};
