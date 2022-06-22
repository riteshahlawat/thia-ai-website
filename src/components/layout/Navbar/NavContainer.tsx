import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
<<<<<<<< HEAD:src/modules/navbar/NavContainer.tsx
import { ContentContainer } from '../common/ContentContainer';
========
import { ContentContainer } from '@/components/common/ContentContainer';
>>>>>>>> main:src/components/layout/Navbar/NavContainer.tsx

export const NavContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            w='full'
            as='nav'
            zIndex={1000}
            position='fixed'
            backdropFilter='auto'
            backdropBlur='32px'
            bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
            // borderBottom='1px'
            // borderBottomColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            <ContentContainer>
                <Flex align='center' className='nav' justify='space-between' wrap='wrap' w='100%'>
                    {children}
                </Flex>
            </ContentContainer>
        </Box>
    );
};
