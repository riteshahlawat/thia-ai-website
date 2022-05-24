import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ContentContainer from '../../common/ContentContainer';

const NavContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      w='full'
      as='nav'
      zIndex={1000}
      position='fixed'
      backdropBlur='64px'
      className='blur nav'
      backdropFilter='auto'
      bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
    >
      <ContentContainer>
        <Flex align='center' className='nav' justify='space-between' wrap='wrap' w='100%'>
          {children}
        </Flex>
      </ContentContainer>
    </Box>
  );
};

export default NavContainer;
