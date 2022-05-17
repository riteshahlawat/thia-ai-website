import Section from './Section';
import RevealOnView from '../../common/RevealOnView';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

interface ImageBoxProps {
  label: string;
  heading: string;
  direction: string;
  description: string;
}

const ImageBox = ({ label, heading, direction, description }: ImageBoxProps) => {
  return (
    <RevealOnView>
      <Section my={{ base: 16, md: 64 }}>
        <Flex
          align='center'
          mx={[0, 0, 5, 16, 20]}
          direction={{ base: 'column', md: direction === 'right' ? 'row-reverse' : 'row' }}
          gap={[4, 6, 10, 12, 16]}
        >
          <Flex direction='column' gap={5} p={4} justify='center' minW={{ base: '50%', xl: '0%' }}>
            <Text
              fontSize='sm'
              fontWeight='semibold'
              letterSpacing='widest'
              color={useColorModeValue('thia.purple-base', 'thia.purple-dark')}
              casing='uppercase'
            >
              {label}
            </Text>
            <Heading fontWeight='normal'>{heading}</Heading>
            <Text>{description}</Text>
          </Flex>
          <Box
            p={4}
            h={'550px'}
            w={'550px'}
            flexShrink={0}
            backgroundImage='linear-gradient(90deg, rgba(71,0,255,1) 0%, rgba(119,66,255,1) 100%)'
            rounded='xl'
          />
        </Flex>
      </Section>
    </RevealOnView>
  );
};

export default ImageBox;
