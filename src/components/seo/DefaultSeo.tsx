import { DefaultSeo as DefaultNextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const name = process.env.NEXT_PUBLIC_SITE_NAME;
const description = process.env.NEXT_PUBLIC_DESCRIPTION;

export const DefaultSeo = () => {
    const { asPath } = useRouter();
    const url = `${baseUrl}${asPath}`;

    const SEO = {
        titleTemplate: `%s - ${name}`,
        defaultTitle: name,
        description,
        canonical: url,
        openGraph: {
            description,
            type: 'website',
            locale: 'en-CA',
            url,
            site_name: name,
            images: [
                {
                    url: 'https://thia.tech/api/og/image?title=AutoML within your ecosystem',
                    width: 1200,
                    height: 630,
                    alt: name,
                },
            ],
        },
        twitter: {
            handle: '@lasithaamuwala',
            site: '@thia_ai',
            cardType: 'summary_large_image',
        },
    };

    return <DefaultNextSeo {...SEO} />;
};
