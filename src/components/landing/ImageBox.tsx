import { Section } from '../common/Section';
import { RevealOnView } from '../common/RevealOnView';
import Image from 'next/future/image';
import { Box, Button, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export interface ImageBoxProps {
    label: string;
    heading: string;
    direction: 'left' | 'right';
    description: string;
    imageSrc: string;
    learnMoreURL: string;
}

export const ImageBox = ({ label, heading, direction, description, imageSrc, learnMoreURL }: ImageBoxProps) => {
    return (
        <RevealOnView>
            <Section my={{ base: 16, lg: 64 }}>
                <Flex
                    align='center'
                    mx={[0, 0, 0, 8, 12]}
                    direction={{
                        base: 'column',
                        lg: direction === 'right' ? 'row-reverse' : 'row',
                    }}
                    gap={[10, 10, 12, 12, 16]}
                >
                    <Flex
                        direction='column'
                        gap={5}
                        p={[0, 0, 4, 4, 4]}
                        justify='center'
                        minW='50%'
                        maxW={{ base: 'none', lg: '50%' }}
                        textAlign={{ base: 'center', lg: 'start' }}
                    >
                        <Text
                            casing='uppercase'
                            fontWeight='bold'
                            letterSpacing='.2rem'
                            color={useColorModeValue('thia.purple.400', 'thia.purple.500')}
                        >
                            {label}
                        </Text>
                        <Heading fontWeight='semibold' fontSize={{ base: '3xl', lg: '5xl' }}>
                            {heading}
                        </Heading>
                        <Text>{description}</Text>
                        <Box pt={5}>
                            <Link href={learnMoreURL}>
                                <Button variant='primaryOutline'>Learn More</Button>
                            </Link>
                        </Box>
                    </Flex>
                    <Box display='block' rounded='xl' overflow='hidden' w={{ base: '100%', lg: '50%' }}>
                        <Image src={imageSrc} alt='figure-1' sizes='100vw' style={{ width: '100%', height: 'auto' }} />
                    </Box>
                </Flex>
            </Section>
        </RevealOnView>
    );
};
