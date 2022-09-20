import React from 'react';
import type { NextPage } from 'next';
import { ContentContainer } from '@/components/common/ContentContainer';
import { Box, Button, Center, Circle, Flex, Heading, IconButton, Text, useColorModeValue, VStack, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SeoPage } from '@/components/seo/SeoPage';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';

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
        role: 'Co-Founder',
        imgPath: '/team/lasitha_amuwala.jpg',
        socials: [
            { name: 'LinkedIn', path: 'https://www.linkedin.com/in/lasitha-amuwala/' },
            { name: 'Github', path: 'https://github.com/lasitha-amuwala' },
        ],
    },
];

const MemberBox = ({ name, role, imgPath, socials }: MemberType) => {
    const socialButtonHoverBG = useColorModeValue('thia.gray.200', 'thia.gray.900');
    return (
        <VStack p={5} gap={1}>
            <Circle size='175px' pos='relative' overflow='hidden' bg={useColorModeValue('blackAlpha.100', 'alphaWhite.100')}>
                <Image alt={name} layout='fill' src={imgPath ?? '/team/placeholder.png'} objectFit='contain' quality={100} />
            </Circle>
            <Text fontSize='md' fontWeight={600} letterSpacing='wider' pt={2}>
                {name}
            </Text>
            <Text fontSize='sm'>{role}</Text>
            <Flex gap={2}>
                {socials.map(({ path, name }) => (
                    <ChakraNextLink href={path} key={name}>
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
                    </ChakraNextLink>
                ))}
            </Flex>
        </VStack>
    );
};

const About: NextPage = () => {
    return (
        <SeoPage title='About us' description='What is Thia about?'>
            <Center h='var(--fullHeightWithoutNav)' pb='var(--header-height)'>
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
                        <Text fontSize='lg'>What to work with us? Get more information about our teams, locations, and culture.</Text>
                        <ChakraNextLink href='/careers'>
                            <Button variant='primary' size='lg'>
                                View Careers
                            </Button>
                        </ChakraNextLink>
                    </VStack>
                </ContentContainer>
            </Box>
        </SeoPage>
    );
};

export default About;
