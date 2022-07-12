import { DefaultSeo as DefaultNextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const title = process.env.NEXT_PUBLIC_TITLE;
const description = process.env.NEXT_PUBLIC_DESCRIPTION;

export const DefaultSeo = () => {
    const { asPath } = useRouter();
    const url = `${baseUrl}${asPath}`;

    const SEO = {
        titleTemplate: `%s - ${title}`,
        description,
        canonical: url,
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'en-CA',
            url,
            site_name: title,
        },
        twitter: {
            handle: '@lasithaamuwala',
            site: '@ThiaAutoML',
            cardType: 'summary_large_image',
        },
    };

    return <DefaultNextSeo {...SEO} />;
};
