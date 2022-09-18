import { Heading } from '@chakra-ui/react';
import { withOGImage } from 'next-api-og-image';

interface QueryParams {
    stage: string;
    name: string;
}

export default withOGImage<'query', QueryParams>({
    template: {
        // include HTML template here
        react: ({ name, stage }) => (
            <Heading>
                {name} - {stage}
            </Heading>
        ),
    },

});

// cacheControl: 'public, max-age=604800, immutable',
// dev: {
//     inspectHtml: false,
// },