import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ContentContainer from '../ContentContainer';

const NavContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      position='fixed'
      zIndex={1000}
      w='full'
      as='nav'
      py={{ base: 2, md: 4 }}
      bg={{
        base: useColorModeValue('thia.purple-base', 'thia.purple-dark'),
        md: useColorModeValue('thia.bg-base', 'thia.bg-dark'),
      }}
    >
      <ContentContainer>
        <Flex align='center' justify='space-between' wrap='wrap' w='100%'>
          {children}
        </Flex>
      </ContentContainer>
    </Box>
  );
};

export default NavContainer;
