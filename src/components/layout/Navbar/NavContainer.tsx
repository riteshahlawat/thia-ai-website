import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { ContentContainer } from '@/components/common/ContentContainer';

export const NavContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            left={0}
            right={0}
            as='header'
            zIndex={1000}
            position='fixed'
            top={0}
            backdropFilter='auto'
            backdropBlur='8px'
            bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
            borderBottom='1px solid'
            borderBottomColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            <nav>
                <ContentContainer>
                    <HStack align='center' className='nav' justify='space-between' wrap='nowrap' w='100%'>
                        {children}
                    </HStack>
                </ContentContainer>
            </nav>
        </Box>
    );
};
