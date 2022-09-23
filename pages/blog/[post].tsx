import { ContentContainer } from '@/components/common/ContentContainer';
import { Footer } from '@/components/layout/Footer';
import { SeoPage } from '@/components/seo/SeoPage';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { Avatar, Box, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { allPosts, Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Headings } from '@/components/docs/DocHeadings';
type Props = { post: Post };

const components = {
    ...Headings,
    Image,
};

const Blog = ({ post }: Props) => {
    const [date, setDate] = useState<string>('');
    const MDXComponent = useMDXComponent(post.body.code);

    useEffect(() => {
        setDate(new Date(post.date).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
    }, []);

    return (
        <SeoPage title={post.title}>
            <ContentContainer as='article' maxW='container.md' pt={{ base: 12, md: 24 }} pb={10}>
                <Heading fontSize={{ base: '2xl', md: '5xl' }}>{post.title}</Heading>
                <Flex fontSize='sm' color='thia.gray.500' justify='space-between'>
                    <HStack py={5}>
                        <Avatar size='xs' name={post.author.name} src={post.author.avatar} />
                        <Text>
                            {post.author.name} • {post.author.position}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text>
                            {date} • {post.readingTime.text}
                        </Text>
                    </HStack>
                </Flex>
                <Box lineHeight='7' color='thia.gray.100'>
                    <Prose>
                        <MDXComponent components={components} />
                    </Prose>
                </Box>
            </ContentContainer>
        </SeoPage>
    );
};

export const getServerSideProps = async ({ params }: any) => {
    const post = allPosts.find((post: Post) => post.url === `blog/${params.post}`);

    if (!post) return { notFound: true };
    return { props: { post } };
};

export default Blog;
