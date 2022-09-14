import { Center, chakra } from '@chakra-ui/react';
import React from 'react';

interface Props {
    src: string;
    title: string;
}
const ChangelogIntroImage = React.memo(({ src, title }: Props) => {
    return (
        <Center>
            <chakra.img src={src} alt={title} title={title} width='700px' borderRadius='10px' />
        </Center>
    );
});

ChangelogIntroImage.displayName = 'ChangelogIntroImage';

export default ChangelogIntroImage;
