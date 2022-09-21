import React from 'react';
import { allPosts, Post } from 'contentlayer/generated';
import { SeoPage } from '@/components/seo/SeoPage';
import { Box, Container, Heading, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { AuthErrorCodes } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

export const getStaticProps = async () => {
    const post = allPosts.map(({ title, url, author, readingTime, coverImage }) => ({ title, url, author, readingTime, coverImage }));
    return { props: { post } };
};

const Blog = ({ post }: { post: Post[] }) => {
    console.log(post);
    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const textColor = useColorModeValue('thia.gray.700', 'thia.gray.500');

    return (
        <SeoPage title='Blog'>
            <Container maxW='container.md'>
                <Box py={10}>
                    <Heading pb={4} fontSize='56px'>
                        Blog
                    </Heading>
                    <Text color={textColor}>Read the latest articles written by team Thia.</Text>
                </Box>
                <VStack gap={5} w='full'>
                    {post.map(({ title, author, readingTime, coverImage }, i) => (
                        <Link href='#' key={i}>
                            <a style={{ width: '100%' }}>
                                <Box w='full' p={5} bg={bgColor} rounded='lg'>
                                    <Box mb={3} position='relative' w='full' rounded='lg' overflow='hidden'>
                                        <Image
                                            src={coverImage.url}
                                            layout='responsive'
                                            alt={coverImage.alt}
                                            width={coverImage.width}
                                            height={coverImage.height}
                                        />
                                    </Box>
                                    <Heading py={3}>{title}</Heading>
                                    <Text>{author.name}</Text>
                                    {readingTime.text}
                                </Box>
                            </a>
                        </Link>
                    ))}
                </VStack>
            </Container>
        </SeoPage>
    );
};

export default Blog;
