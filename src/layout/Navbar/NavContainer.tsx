import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ContentContainer from '../ContentContainer';

const NavContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box pb={20}>
      <Box
        className='blur'
        position='fixed'
        zIndex={1000}
        w='full'
        as='nav'
        py={{ base: 2, md: 5 }}
        bg={{
          base: useColorModeValue('thia.purple-base', 'thia.purple-dark'),
          md: useColorModeValue('whiteAlpha.800', 'blackAlpha.800'),
        }}
        backdropFilter='auto'
        backdropBlur='64px'
      >
        <ContentContainer>
          <Flex align='center' justify='space-between' wrap='wrap' w='100%'>
            {children}
          </Flex>
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default NavContainer;
