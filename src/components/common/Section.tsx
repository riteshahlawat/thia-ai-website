import { Box } from '@chakra-ui/react';
import { ContentContainer } from './ContentContainer';

interface Props extends React.ComponentPropsWithoutRef<typeof Box> {
    children?: React.ReactNode;
}

export const Section = (props: Props) => {
    const { children, ...rest } = props;
    return (
        <Box as='section' {...rest}>
            <ContentContainer>{children}</ContentContainer>
        </Box>
    );
};
