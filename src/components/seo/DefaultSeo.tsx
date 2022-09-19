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
        description,
        canonical: url,
        openGraph: {
            title: `%s - ${name}`,
            description,
            type: 'website',
            locale: 'en-CA',
            url,
            site_name: name,
        },
        twitter: {
            handle: '@lasithaamuwala',
            site: '@thia_ai',
            cardType: 'summary_large_image',
        },
    };

    return <DefaultNextSeo {...SEO} />;
};
