import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface LinkObjType {
    [key: string]: {
        path: string;
        icon: React.ReactNode;
        label: string;
    };
}

export const links: LinkObjType = {
    landing: { path: '/', icon: null, label: 'Home' },
    pricing: { path: '/pricing', icon: null, label: 'Pricing' },
    download: { path: '/download', icon: null, label: 'Download' },
    support: { path: '/support', icon: null, label: 'Support' },
    docs: { path: '/docs', icon: null, label: 'Docs' },
    changelog: { path: '/changelog', icon: null, label: 'Changelog' },
};

export const socials: LinkObjType = {
    twitter: { path: 'https://twitter.com/thia_ai', icon: <FaTwitter />, label: 'Twitter' },
    linkedin: { path: '#', icon: <FaLinkedin />, label: 'LinkedIn' },
    github: { path: '#', icon: <FaGithub />, label: 'Github' },
};
