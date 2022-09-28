import React from 'react';
import { allPosts, Post } from 'contentlayer/generated';
import { SeoPage } from '@/components/seo/SeoPage';
import { Box, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ContentContainer } from '@/components/common/ContentContainer';

export const getStaticProps = async () => {
    const posts = allPosts
        .map(({ url, date, title, author, readingTime, coverImage, description }) => ({
            url,
            date,
            title,
            author,
            readingTime,
            coverImage,
            description,
        }))
        .sort((a: Partial<Post>, b: Partial<Post>) => +new Date(b.date as string) - +new Date(a.date as string));

    return { props: { posts } };
};

const Blog = ({ posts }: { posts: Post[] }) => {
    const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
    const textColor = useColorModeValue('thia.gray.700', 'thia.gray.500');

    return (
        <SeoPage title='Blog'>
            <ContentContainer maxW='container.md'>
                <Box pt={10} pb={{ base: 5, md: 10 }}>
                    <Heading pb={4} fontSize='56px'>
                        Blog
                    </Heading>
                    <Text color={textColor}>Read the latest articles written by team Thia.</Text>
                </Box>
                <Heading pt={3} pb={5}>
                    All Posts
                </Heading>
                <VStack w='full' gap={2}>
                    {posts.map(({ title, readingTime, url, description }, i) => (
                        <Link href={url} key={i}>
                            <a style={{ width: '100%' }}>
                                <Box
                                    bg={bgColor}
                                    p={5}
                                    rounded='lg'
                                    as={motion.div}
                                    w='full'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 1.02 }}
                                    pb={5}
                                >
                                    <Box w='full'>
                                        <HStack pb={3}>
                                            <Heading fontWeight='semibold' fontSize={{ base: 'lg', md: 'xl' }} flexGrow={1}>
                                                {title}
                                            </Heading>
                                            <Text color={textColor} fontSize='sm'>
                                                {readingTime.text}
                                            </Text>
                                        </HStack>
                                        <Text color={textColor}>{description}</Text>
                                    </Box>
                                </Box>
                            </a>
                        </Link>
                    ))}
                </VStack>
            </ContentContainer>
        </SeoPage>
    );
};

export default Blog;
