import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { ContentContainer } from '@/components/common/ContentContainer';

export const NavContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            left={0}
            right={0}
            as='nav'
            zIndex={1000}
            position='fixed'
            backdropFilter='auto'
            backdropBlur='8px'
            bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
            borderBottom='1px solid'
            borderBottomColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            <ContentContainer pl={[6, 7, 8, 8, 8]} pr={[0, 0, 8, 8, 8]}>
                <HStack align='center' className='nav' justify='space-between' wrap='nowrap' w='100%'>
                    {children}
                </HStack>
            </ContentContainer>
        </Box>
    );
};
