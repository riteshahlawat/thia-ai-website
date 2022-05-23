import Section from './Section';
import RevealOnView from '../../common/RevealOnView';
import { Box, Button, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

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
          gap={[10, 10, 12, 12, 16]}
        >
          <Flex
            direction='column'
            gap={5}
            p={[0, 0, 4, 4, 4]}
            justify='center'
            minW='50%'
            textAlign={{ base: 'center', md: 'start' }}
          >
            <Text
              casing='uppercase'
              fontWeight='bold'
              letterSpacing='.2rem'
              color={useColorModeValue('thia.purple.400', 'thia.purple.500')}
            >
              {label}
            </Text>
            <Heading fontWeight='semibold' fontSize={{ base: '3xl', md: '5xl' }}>
              {heading}
            </Heading>
            <Text>{description}</Text>
            <Box pt={5}>
              <Button variant='primaryOutline'>Learn More</Button>
            </Box>
          </Flex>
          <Box
            p={4}
            h='450px'
            w='100%'
            maxW={{ base: '100%', md: '50%' }}
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
