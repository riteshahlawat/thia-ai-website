import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

interface LinkObjType {
    [key: string]: {
        path: string;
        icon: React.ReactNode;
        label: string;
    };
}

export const links: LinkObjType = {
    docs: { path: '/docs', icon: null, label: 'Docs' },
    blog: { path: '/blog', icon: null, label: 'Blog' },
    about: { path: '/about', icon: null, label: 'About us' },
    landing: { path: '/', icon: null, label: 'Home' },
    pricing: { path: '/pricing', icon: null, label: 'Pricing' },
    support: { path: '/support', icon: null, label: 'Support' },
    careers: { path: '/careers', icon: null, label: 'Careers' },
    download: { path: '/download', icon: null, label: 'Download' },
    changelog: { path: '/changelog', icon: null, label: 'Changelog' },
};

export const socials: LinkObjType = {
    twitter: { path: 'https://twitter.com/thia_ai', icon: <FaTwitter />, label: 'Twitter' },
    instagram: { path: 'https://www.instagram.com/thia.ai/', icon: <FaInstagram />, label: 'Instagram' },
    linkedin: { path: 'https://www.linkedin.com/company/thia-ai/', icon: <FaLinkedin />, label: 'LinkedIn' },
};
