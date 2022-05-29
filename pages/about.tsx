import React from 'react';
import type { NextPage } from 'next';
import { ContentContainer } from '../src/modules/common/ContentContainer';
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface MemberType {
  name: string;
  role: string;
  imgPath?: string;
  socials: Array<{
    name: string;
    path: string;
  }>;
}

const socialIcons: { [key: string]: React.ReactNode } = {
  LinkedIn: <FaLinkedin />,
  Github: <FaGithub />,
};

const teamData: Array<MemberType> = [
  {
    name: 'Ritesh Ahlawat',
    role: 'Founder',
    imgPath: '/team/ritesh_ahlawat.jpg',
    socials: [
      { name: 'LinkedIn', path: 'https://www.linkedin.com/in/ritesh-ahlawat/' },
      { name: 'Github', path: 'https://github.com/riteshahlawat' },
    ],
  },
  {
    name: 'Lasitha Amuwala',
    role: 'Developer',
    imgPath: '/team/lasitha_amuwala.jpg',
    socials: [
      { name: 'LinkedIn', path: 'https://www.linkedin.com/in/lasitha-amuwala/' },
      { name: 'Github', path: 'https://github.com/lasitha-amuwala' },
    ],
  },
  {
    name: 'Michelle Lenartowicz',
    role: 'Business',
    imgPath: '/team/michelle_lenartowicz.jpg',
    socials: [{ name: 'LinkedIn', path: 'https://www.linkedin.com/in/michellelenartowicz/' }],
  },
  {
    name: 'David Chan',
    role: 'Developer',
    socials: [
      { name: 'LinkedIn', path: 'https://www.linkedin.com/in/dchan0013/' },
      { name: 'Github', path: 'https://github.com/occamsrazor0013' },
    ],
  },
  {
    name: 'Agamjot Saini',
    role: 'Developer',
    imgPath: '/team/agamjot_saini.jpg',
    socials: [
      { name: 'LinkedIn', path: 'https://www.linkedin.com/in/agamjot-saini/' },
      { name: 'Github', path: 'https://github.com/agamjot-saini' },
    ],
  },
];

const MemberBox = ({ name, role, imgPath, socials }: MemberType) => {
  const socialButtonHoverBG = useColorModeValue('thia.gray.200', 'thia.gray.900');
  return (
    <VStack p={5} gap={1}>
      <Circle
        size='175px'
        pos='relative'
        overflow='hidden'
        bg={useColorModeValue('blackAlpha.100', 'alphaWhite.100')}
      >
        <Image
          alt={name}
          layout='fill'
          src={imgPath ?? '/team/placeholder.png'}
          objectFit='contain'
          quality={100}
        />
      </Circle>
      <Text fontSize='md' fontWeight={600} letterSpacing='wider' pt={2}>
        {name}
      </Text>
      <Text fontSize='sm'>{role}</Text>
      <Flex gap={2}>
        {socials.map(({ path, name }) => (
          <Link href={path} key={name} isExternal>
            <IconButton
              key={name}
              rounded='full'
              aria-label={name}
              variant='secondaryGhost'
              _hover={{
                borderRadius: '3xl',
                bg: socialButtonHoverBG,
              }}
            >
              {socialIcons[name]}
            </IconButton>
          </Link>
        ))}
      </Flex>
    </VStack>
  );
};

const About: NextPage = () => {
  return (
    <>
      <Center className='fullHeightWithoutNav' pb='var(--header-height)'>
        <VStack spacing={5} align='center' textAlign='center' maxW='7xl'>
          <Text
            fontSize={{ base: 'xs', md: 'md' }}
            casing='uppercase'
            letterSpacing='.2rem'
            color={useColorModeValue('thia.purple.400', 'thia.purple.400')}
          >
            Our Mission
          </Text>
          <Heading fontSize={{ base: '3xl', md: '6xl' }} pb={{ base: 0, md: 5 }}>
            We enable developers to create powerful machine learning models
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'xl' }}>
            We make machine learning
            <Box as='span' fontWeight={600}>
              {' simple.'}
            </Box>
          </Text>
        </VStack>
      </Center>
      <VStack>
        <Heading fontSize={{ base: '3xl', md: '6xl' }}>Meet the Thia team!</Heading>
        <Flex gap={5} flexWrap='wrap' justify='center' py={{ base: 5, md: 20 }}>
          {teamData.map(member => (
            <MemberBox {...member} key={member.name} />
          ))}
        </Flex>
      </VStack>
      <Box mt={10} bg={useColorModeValue('thia.gray.100', 'whiteAlpha.50')}>
        <ContentContainer py={{ base: 10, md: 20 }}>
          <VStack spacing={8}>
            <Heading fontSize='5xl'>Intrested in Thia?</Heading>
            <Text fontSize='lg'>
              What to work with us? Get more information about our teams, locations, and culture.
            </Text>
            <Link href='/careers'>
              <Button variant='primary' size='lg'>
                View Careers
              </Button>
            </Link>
          </VStack>
        </ContentContainer>
      </Box>
    </>
  );
};

export default About;
